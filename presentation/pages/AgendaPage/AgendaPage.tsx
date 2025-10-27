"use client";
import React, { forwardRef, useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { format, parse, startOfWeek, getDay, parseISO, addBusinessDays, addDays, add, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { SketchPicker } from 'react-color';
import { Grid, Typography, Box, IconButton, Select, MenuItem, FormControl, InputLabel, Accordion, AccordionSummary, AccordionDetails, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, InputAdornment, Autocomplete, TextField, Drawer, Button, Fab, Chip } from '@mui/material';
import { Close as CloseIcon, ExpandMore, FilterList } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { adicionarEventoAgenda, buscarEventosAgenda, buscarTipos, buscarUsuariosAgenda, filtrarAgenda } from '@/app/api/client/agenda';
import { getEndpointByProcessNumber, limparNumeroProcesso } from '../../components/Tribunais';
import ProcessNumberField from '../../components/ProcessNumberField';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../styles/App.css';
import './css/Agenda.css';
import { styled } from '@mui/system';
import { procurarProcesso } from '@/app/api/client/processo';
import GridSelectField from '@/presentation/components/GridSelectField';
import GridTextField from '@/presentation/components/GridTextField';
import { AutoComplete } from '@/presentation/components/AutoComplete';
import { Btn } from '@/presentation/components/Button';

const DnDCalendar = withDragAndDrop(Calendar) as unknown as React.ComponentType<any>;
const DatePicker = ReactDatePicker as unknown as React.ComponentType<any>;

const StyledDatePickerWrapper = styled('div')({
  '& .react-datepicker__header': {
    backgroundColor: 'white',
  },
  '& .react-datepicker__current-month, & .react-datepicker-time__header, & .react-datepicker-year-header': {
    color: 'black',
  },
  '& .react-datepicker__day, & .react-datepicker__time-name': {
    color: 'black',
  },
  '& .react-datepicker': {
    margin: 0,
    backgroundColor: 'white',
    width: '100% !important',
  },
  '& .react-datepicker-popper': {
    zIndex: 1500,
  },
  margin: 0
});

const locales = {
  'pt-BR': ptBR,
};

const CustomInput = forwardRef((props: any, ref: any) => (
  <TextField {...props} inputRef={ref} fullWidth />
));

CustomInput.displayName = 'CustomInputTextField'

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: ptBR }),
  getDay: (date: any) => getDay(date),
  locales,
});

export const convertISOForBR = (isoDate: string) => {
  try {
    const date = parseISO(isoDate);
    if (isValid(date)) {
      return format(date, "dd/MM/yyyy HH:mm:ss", { locale: ptBR });
    }
    return isoDate;
  } catch (error) {
    return isoDate;
  }
}

const processDataAjuizamento = (dataAjuizamento: any) => {
  if (dataAjuizamento instanceof Date) {
    return dataAjuizamento;
  }

  if (!dataAjuizamento) {
    return null;
  }

  return parse(convertISOForBR(dataAjuizamento), "dd/MM/yyyy HH:mm:ss", new Date(), { locale: ptBR });
}

const formats = {
  dateFormat: 'dd',
  dayFormat: (date: any, culture: any, localizer: any) =>
    format(date, 'eeee dd/MM', { locale: ptBR }),
  agendaDateFormat: (date: any, culture: any, localizer: any) =>
    format(date, 'dd/MM/yyyy', { locale: ptBR }),
  monthHeaderFormat: (date: any, culture: any, localizer: any) =>
    format(date, 'MMMM yyyy', { locale: ptBR }),
  dayHeaderFormat: (date: any, culture: any, localizer: any) =>
    format(date, 'dd/MM/yyyy', { locale: ptBR }),
  dayRangeHeaderFormat: ({ start, end }: any, culture: any, localizer: any) =>
    `${format(start, 'dd/MM/yyyy', { locale: ptBR })} – ${format(end, 'dd/MM/yyyy', { locale: ptBR })}`,
  agendaHeaderFormat: ({ start, end }: any, culture: any, localizer: any) =>
    `${format(start, 'dd/MM/yyyy', { locale: ptBR })} – ${format(end, 'dd/MM/yyyy', { locale: ptBR })}`,
};

const messages = {
  allDay: 'Dia todo',
  previous: 'Anterior',
  next: 'Próximo',
  today: 'Hoje',
  month: 'Mês',
  week: 'Semana',
  work_week: 'Semana de trabalho',
  day: 'Dia',
  agenda: 'Agenda',
  date: 'Data',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'Não há eventos neste período.',
  showMore: (total: any) => `+ ver mais (${total})`,
  workWeek: 'Semana de trabalho',
  now: 'Agora',
  yesterday: 'Ontem',
  tomorrow: 'Amanhã',
};

function MyCalendar() {
  const [events, setEvents] = useState<any>([]);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [partes, setPartes] = useState([]);
  const [view, setView] = useState<View>('month');
  const [date, setDate] = useState(new Date());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [tipos, setTipos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [newEvent, setNewEvent] = useState({
    id: "0",
    title: '',
    description: '',
    color: '#1976D2',
    notificacao: '',
    numero_processo: "",
    orgao_julgador: "",
    cliente_principal: "",
    contrario_principal: "",
    responsavel_principal: "",
    categoria: '',
    usuarios_pertencentes: [],
    data_ajuizamento: "",
    prazo: "",
    tipo: {},
    tipo_contagem_prazo: "dias_uteis",
    classe: "",
    movimentacoes: [],
    status: "pendente",
    inicio_previsto: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
    conclusao_prevista: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
    start: new Date(),
    end: new Date()
  });
  const [filtros, setFiltros] = useState({ tipo: {}, status: '', nome: '', numero_processo: '', usuarios_pertencentes: [] });
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const onEventDrop = async ({ event, start, end }: any) => {
    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    setEvents(events.map((evt: any, i: number) => (i === idx ? updatedEvent : evt)) as any);

    try {
      const resultadoAdicionarEventoAgenda = await adicionarEventoAgenda({ id: event.id, categoria: event.categoria, title: event.title, usuarios_pertencentes: event.usuarios_pertencentes, start, end });
    } catch (err: any) {
      console.error(err)
    }
  };

  const limparFiltros = async (e: any) => {
    e.preventDefault();

    getEvents();
    setFiltros({ tipo: {}, status: '', nome: '', numero_processo: '', usuarios_pertencentes: [] })
  }

  const toggleFilterDrawer = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
  };

  const SelectableChipInput = () => {
    const handleAddItem = (event: any, newValue: any) => {
      setNewEvent({ ...newEvent, usuarios_pertencentes: newValue })
    };

    const handleDeleteItem = (itemToDelete: any) => {
      setNewEvent({ ...newEvent, usuarios_pertencentes: newEvent.usuarios_pertencentes.filter((item: any) => item.id !== itemToDelete.id) });
    };

    return (
      <Grid item xs={12}>

        <Typography
          width={'100%'}
          marginLeft={1.5}
          marginTop={1}
          fontSize={15}
          color={'#384150'}>Usuários responsáveis
        </Typography>

        <AutoComplete
          placeholder='Selecione usuários'
          options={usuarios}
          value={newEvent.usuarios_pertencentes}
          onChange={handleAddItem}
          name={'usuarios'}
        />

      </Grid>
    );
  };

  const SelectableChipInputFiltro = () => {
    const handleAddItem = (event: any, newValue: any) => {
      setFiltros({ ...filtros, usuarios_pertencentes: newValue })
    };

    const handleDeleteItem = (itemToDelete: any) => {
      setFiltros({ ...filtros, usuarios_pertencentes: filtros.usuarios_pertencentes.filter((item: any) => item.id !== itemToDelete.id) });
    };

    return (
      <Box sx={{ width: '100%' }}>
        <Autocomplete
          multiple
          options={usuarios}
          getOptionLabel={(option: any) => option.nome}
          value={filtros.usuarios_pertencentes}
          onChange={handleAddItem}
          renderTags={(value, getTagProps) =>
            value.map((option: any, index: number) => (
              <Chip
                {...getTagProps({ index })}
                key={index}
                variant="outlined"
                label={option.nome}
                onDelete={() => handleDeleteItem(option)}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Usuários responsáveis"
              placeholder="Adicionar"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </Box>
    );
  };

  async function getEvents() {
    try {
      const dadosAgenda = await buscarEventosAgenda();
      const transformedEvents = dadosAgenda.map((event: any) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
        description: event.descricao,
      }));
      setEvents(transformedEvents);

      const dadosTipos = await buscarTipos();
      setTipos(dadosTipos);

      const usuariosAgenda = await buscarUsuariosAgenda();
      setUsuarios(usuariosAgenda);
    } catch (err: any) {
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  function calcularConclusaoPrevista(event: any) {
    setNewEvent({ ...event })
    if (event.prazo && event.tipo_contagem_prazo) {
      if (event.tipo_contagem_prazo === "dias_uteis") {
        const conclusaoPrevista = parse(format(addBusinessDays(new Date(event.inicio_previsto), Number(event.prazo)), 'dd/MM/yyyy HH:mm:ss'), "dd/MM/yyyy HH:mm:ss", new Date(), { locale: ptBR });
        const start = newEvent.categoria === "prazo" ? conclusaoPrevista : newEvent.start;
        const end = newEvent.categoria === "prazo" ? conclusaoPrevista : newEvent.end;
        setNewEvent({ ...event, conclusao_prevista: conclusaoPrevista, start, end });
      }

      if (event.tipo_contagem_prazo === "dias_corridos") {
        const conclusaoPrevista = parse(format(add(event.inicio_previsto, { days: Number(event.prazo) }), 'dd/MM/yyyy HH:mm:ss'), "dd/MM/yyyy HH:mm:ss", new Date(), { locale: ptBR });
        const start = newEvent.categoria === "prazo" ? conclusaoPrevista : newEvent.start;
        const end = newEvent.categoria === "prazo" ? conclusaoPrevista : newEvent.end;
        setNewEvent({ ...event, conclusao_prevista: conclusaoPrevista, start, end });
      }
    }
  }

  const onEventResize = async ({ event, start, end }: any) => {
    const idx = events.indexOf(event as never);
    const updatedEvent = { ...event, start, end };

    setEvents(events.map((evt: any, i: any) => (i === idx ? updatedEvent : evt)) as any);

    try {
      const resultadoAdicionarEventoAgenda = await adicionarEventoAgenda({ id: event.id, title: event.title, categoria: event.categoria, usuarios_pertencentes: event.usuarios_pertencentes, start, end });
    } catch (err: any) {
      console.error(err)
    }
  };

  const eventPropGetter = (event: any) => {
    const backgroundColor = event.color || '#3174ad';
    return { style: { backgroundColor } };
  };

  const handleSelectEvent = (event: any) => {
    setNewEvent({
      id: String(event.id),
      title: event.title,
      description: event.description || '',
      color: event.color,
      notificacao: event.notificacao,
      start: new Date(event.start),
      numero_processo: event.numero_processo,
      cliente_principal: event.cliente_principal,
      contrario_principal: event.contrario_principal,
      responsavel_principal: event.responsavel_principal,
      orgao_julgador: event.orgao_julgador,
      data_ajuizamento: processDataAjuizamento(event.data_ajuizamento),
      usuarios_pertencentes: event.usuarios_pertencentes,
      classe: event.classe,
      tipo: event.tipo,
      categoria: event.categoria,
      prazo: event.prazo,
      tipo_contagem_prazo: event.tipo_contagem_prazo,
      inicio_previsto: processDataAjuizamento(event.inicio_previsto),
      conclusao_prevista: processDataAjuizamento(event.conclusao_prevista),
      status: event.status,
      movimentacoes: event.movimentacoes,
      end: new Date(event.end)
    } as any);
    setIsEditingDescription(false);
    setMovimentacoes([])
    setDrawerOpen(true);
  };

  const setCategoria = async (categoriaEscolhida: string) => {
    const start = categoriaEscolhida === "prazo" ? newEvent.conclusao_prevista : newEvent.start;
    const end = categoriaEscolhida === "prazo" ? newEvent.conclusao_prevista : newEvent.end;
    setNewEvent({ ...newEvent, categoria: categoriaEscolhida, start, end } as any);
  }

  const pesquisarProcesso = async () => {
    try {
      const url = getEndpointByProcessNumber(newEvent.numero_processo);
      const dadosProcesso = await procurarProcesso(url, limparNumeroProcesso(newEvent.numero_processo));

      if (dadosProcesso.hits.hits[0]._source) {
        setNewEvent({ ...newEvent, orgao_julgador: dadosProcesso.hits.hits[0]._source.orgaoJulgador.nome, data_ajuizamento: parse(convertISOForBR(dadosProcesso.hits.hits[0]._source.dataAjuizamento), "dd/MM/yyyy HH:mm:ss", new Date(), { locale: ptBR }), classe: dadosProcesso.hits.hits[0]._source.classe.nome ? dadosProcesso.hits.hits[0]._source.classe.nome : "", movimentacoes: dadosProcesso.hits.hits[0]._source.movimentos ? dadosProcesso.hits.hits[0]._source.movimentos : [] } as any);
      }
    } catch (error: any) {
    }
  }

  const handleSelectSlot = ({ start, end }: any) => {
    setNewEvent({
      id: "0",
      title: '',
      description: '',
      numero_processo: "",
      notificacao: '',
      orgao_julgador: '',
      cliente_principal: '',
      contrario_principal: '',
      responsavel_principal: '',
      usuarios_pertencentes: usuarios,
      data_ajuizamento: '',
      tipo: {},
      classe: '',
      categoria: 'audiencia',
      color: '#1976D2',
      movimentacoes: [],
      inicio_previsto: new Date(start),
      conclusao_prevista: new Date(end),
      tipo_contagem_prazo: 'dias_uteis',
      prazo: "",
      status: "pendente",
      start: new Date(start),
      end: new Date(end)
    } as any);
    setIsEditingDescription(true);
    setDrawerOpen(true);
  };

  const handleViewChange = (newView: any) => {
    setView(newView);
  };

  const handleNavigate = (newDate: any) => {
    setDate(newDate);
  };

  const handleSaveEvent = async () => {
    const evento = newEvent;
    if (evento.id === "0") {
      setEvents([...events, { ...evento, id: String(events.length + 1) }] as any);
    } else {
      setEvents(events.map((event: any) => (event.id === evento.id ? evento : event)) as any);
    }

    //TODO fazer envio para o back-end

    try {
      if (!evento.title) {
        throw new Error("É obrigatório enviar o título do evento!")
      }

      evento.prazo = String(evento.prazo);

      const resultadoAdicionarEventoAgenda = await adicionarEventoAgenda(evento);
    } catch (err: any) {
      console.error(err)
    }
    setDrawerOpen(false);
  };

  const handleFiltros = async () => {
    const resultadoFiltro = await filtrarAgenda(filtros);
    const transformedEvents = resultadoFiltro.map((event: any) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
      description: event.descricao,
    }));
    setEvents(transformedEvents);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <DnDCalendar
          selectable
          events={events}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          onSelectSlot={handleSelectSlot}
          resizable
          view={view}
          onView={handleViewChange}
          date={date}
          onNavigate={handleNavigate}
          localizer={localizer}
          formats={formats}
          messages={messages}
          eventPropGetter={eventPropGetter}
          onSelectEvent={handleSelectEvent}
          style={{ height: '80vh', width: '80vw' }}
        />
      </div>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div style={{ width: 800, padding: 40, backgroundColor: 'white', color: '#000', height: '100%', position: 'relative', paddingTop: 100 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" style={{ marginBottom: 20 }}>
            <Typography variant="h6" style={{ color: '#1976D2' }}>
              {newEvent.id ? 'Editar evento' : 'Novo evento'}
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)} style={{ color: '#1976D2' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid container spacing={2}>

            <GridSelectField
              xs={12}
              variant='filled'
              name={'categoria'}
              onChange={(e) => setCategoria(e.target.value)}
              value={newEvent.categoria || 'audiencia'}
              label={'Categoria'}
              options={[
                { descricao: 'Audiência/Sessão', value: 'audiencia' },
                { descricao: 'Reunião', value: 'reuniao' },
                { descricao: 'Prazo', value: 'prazo' }
              ]}
            />

            <GridTextField
              xs={6}
              label='Título *'
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              variant='filled'

            />

            <GridSelectField
              xs={6}
              variant='filled'
              name={'notificacao'}
              value={newEvent.notificacao || '30'}
              onChange={(e) => setNewEvent({ ...newEvent, notificacao: e.target.value } as any)}
              label="Notificação"
              options={[
                { descricao: 'Não notificar', value: 'false' },
                { descricao: '10 minutos', value: '10' },
                { descricao: '30 minutos', value: '30' },
                { descricao: '1 hora', value: '60' },
              ]}
            />

            <GridTextField
              xs={12}
              label="Adicionar descrição"
              variant='filled'
              multiline
              name='descricao'
              placeholder='descrição...'
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />

            <GridTextField
              xs={12}
              variant='filled'
              value={newEvent.color}
              label="Escolha uma cor para o evento"
              onClick={() => setIsOpen(!isOpen)}
              startAdornment={
                (
                  <InputAdornment position="start">
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: newEvent.color,
                        border: '1px solid #ccc',
                        borderRadius: 4,
                      }}
                    />
                  </InputAdornment>
                )
              }
            />

            {isOpen && (
              <div
                style={{
                  position: 'absolute',
                  zIndex: 1000,
                  backgroundColor: 'white',
                  padding: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <SketchPicker
                  color={newEvent.color}
                  onChangeComplete={(e) => {
                    setIsOpen(false);
                    setNewEvent({ ...newEvent, color: e.hex });
                  }}
                />
              </div>
            )}

            <GridSelectField
              xs={12}
              variant='filled'
              value={newEvent.status || "pendente"}
              onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
              label="Status"
              name='status'
              options={[
                { descricao: 'Pendente', value: 'pendente' },
                { descricao: 'Cumprido', value: 'cumprido' },
                { descricao: 'Não Cumprido', value: 'nao_cumprido' },
                { descricao: 'Cancelado', value: 'cancelado' },
              ]}
            />

            <AutoComplete
              options={tipos}
              value={[]}
              onChange={(e: any, value: any) => {
                calcularConclusaoPrevista({ ...newEvent, tipo: value, prazo: value.prazo } as any);
              }}
              name={'tipo'}
              label='Selecione uma opção'
            />

            <GridTextField
              xs={6}
              label='Prazo'
              placeholder='prazo'
              variant='filled'
              value={newEvent.prazo}
              onChange={(e) => {
                calcularConclusaoPrevista({ ...newEvent, prazo: String(e.target.value) })
              }}
            />

            <GridSelectField
              xs={6}
              variant='filled'
              label='Tipos'
              value={newEvent.tipo_contagem_prazo || "dias_uteis"}
              name='tipos'
              onChange={(e) => {
                calcularConclusaoPrevista({ ...newEvent, tipo_contagem_prazo: e.target.value })
              }}
              options={[
                { descricao: 'Dias Corridos', value: 'dias_corridos' },
                { descricao: 'Dias Úteis', value: 'dias_uteis' },
              ]}
            />

            <GridTextField
              xs={6}
              variant='filled'
              label='Início previsto/efetivo'
              type='date'
              value={newEvent.inicio_previsto}
              onChange={(e) => setNewEvent({ ...newEvent, inicio_previsto: e.target.value } as any)}
            />

            <GridTextField
              xs={6}
              variant='filled'
              label='Conclusão prevista'
              type='date'
              value={newEvent.conclusao_prevista}
              onChange={(e) => setNewEvent({ ...newEvent, conclusao_prevista: e.target.value } as any)}
            />

            <Grid item xs={12} style={{ padding: '8px' }}>
              <ProcessNumberField
                value={newEvent.numero_processo}
                onChange={(e) => setNewEvent({ ...newEvent, numero_processo: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} style={{ padding: '8px' }}>
              <Btn
                variant='outlined'
                color='primary'
                text='Pesquisar Processo'
                style={{ height: "57px" }}
                backgroundTransparent
                onClick={() => pesquisarProcesso()}
              />
            </Grid>


            <GridTextField
              xs={4}
              variant='filled'
              label="Órgão julgador"
              placeholder='órgão julgador'
              onChange={(e) => setNewEvent({ ...newEvent, orgao_julgador: e.target.value })}
              value={newEvent.orgao_julgador}
            />

            <GridTextField
              xs={4}
              variant='filled'
              label="Data Ajuizamento"
              placeholder='data ajuizamento'
              type='date'
              onChange={(e) => setNewEvent({ ...newEvent, data_ajuizamento: e.target.value } as any)}
              value={newEvent.data_ajuizamento}
            />

            <GridTextField
              xs={4}
              variant='filled'
              label="Classe"
              placeholder='classe'
              onChange={(e) => setNewEvent({ ...newEvent, classe: e.target.value })}
              value={newEvent.classe}
            />

            <GridTextField
              xs={6}
              variant='filled'
              label="Cliente Principal"
              placeholder='cliente principal'
              onChange={(e) => setNewEvent({ ...newEvent, cliente_principal: e.target.value })}
              value={newEvent.cliente_principal}
            />

            <GridTextField
              xs={6}
              variant='filled'
              label="Contrário Principal"
              placeholder='contrário principal'
              onChange={(e) => setNewEvent({ ...newEvent, contrario_principal: e.target.value })}
              value={newEvent.contrario_principal}
            />

            <Grid item xs={12} style={{ padding: '8px' }}>
              <SelectableChipInput />
            </Grid>

            <Grid item xs={12} style={{ padding: '8px' }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  style={{ fontSize: 15 }}
                >
                  Movimentações do processo
                </AccordionSummary>
                <AccordionDetails style={{ fontSize: 15 }}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Código</TableCell>
                          <TableCell align="left">Nome</TableCell>
                          <TableCell align="left">Data e Hora</TableCell>
                          <TableCell align="left">Ações</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {newEvent.movimentacoes && newEvent.movimentacoes.map((row: any, index: number) => (
                          <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row.codigo}
                            </TableCell>
                            <TableCell align="left">{row.nome}</TableCell>
                            <TableCell align="left">{convertISOForBR(row.dataHora)}</TableCell>
                            <TableCell align="left"></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid item xs={12} style={{ padding: '8px' }}>
              <Btn
                variant="contained"
                onClick={handleSaveEvent}
                text='Salvar'
                style={{ backgroundColor: '#1976D2', color: '#fff' }}
              />
            </Grid>
          </Grid>
        </div>
      </Drawer>

      <Fab
        color="primary"
        aria-label="add"
        style={{
          position: 'fixed',
          right: 20,
          bottom: 20,
          zIndex: 1500
        }}
        onClick={toggleFilterDrawer}
      >
        <FilterList />
      </Fab>

      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
      >
        <div style={{ width: 400, padding: 20, marginTop: "10px" }}>
          <br /><br /><br />
          <Button style={{ color: '#00204B' }} onClick={(e) => limparFiltros(e)}>Limpar Filtros</Button>

          <br /><br />

          <TextField
            label="Nome do evento"
            fullWidth
            value={filtros.nome}
            onChange={(e) => setFiltros({ ...filtros, nome: e.target.value })}
            variant="outlined"
            sx={{
              '& .MuiInputBase-root': {
                padding: 0,
                margin: 0,
                borderRadius: 0,
                color: '#00204B'
              },
              '& .MuiOutlinedInput-input': {
                margin: 0,
                borderRadius: 0,
                color: '#00204B'
              },
              '& .MuiInputLabel-root': {
                margin: 0,
                borderRadius: 0,
                color: '#00204B'
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: 0,
                color: '#00204B',
                '& fieldset': {
                  borderRadius: 0,
                  color: '#00204B'
                },
              },
              borderRadius: 0,
              margin: 0, // Remove a margem padrão,
              color: '#00204B'
            }}
            InputLabelProps={{ style: { color: '#00204B' }, shrink: true }}
            InputProps={{ style: { color: '#000' } }}
          />

          <br /><br />

          <SelectableChipInputFiltro />

          <br />

          <FormControl sx={{ padding: 0, margin: 0 }} fullWidth variant="outlined">
            <InputLabel shrink>Status</InputLabel>
            <Select
              value={filtros.status || "todos"}
              onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
              label="Status"
              fullWidth
            >
              <MenuItem value="todos">Todos</MenuItem>
              <MenuItem value="pendente">Pendente</MenuItem>
              <MenuItem value="cumprido">Cumprido</MenuItem>
              <MenuItem value="nao_cumprido">Não cumprido</MenuItem>
              <MenuItem value="cancelado">Cancelado</MenuItem>
            </Select>
          </FormControl>

          <br /><br />

          <ProcessNumberField

            value={filtros.numero_processo}
            onChange={(e) => setFiltros({ ...filtros, numero_processo: e.target.value })}
          />

          <br /><br />

          <Button variant='outlined' size='large' onClick={() => handleFiltros()} style={{ backgroundColor: '#00204B', color: 'white' }} startIcon={<SearchIcon />}>FILTRAR</Button>
        </div>
      </Drawer>
    </DndProvider>
  );
}

export default MyCalendar;
