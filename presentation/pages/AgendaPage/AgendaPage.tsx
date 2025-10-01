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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../styles/App.css';
import './css/Agenda.css';
import { styled } from '@mui/system';
import { procurarProcesso } from '@/app/api/client/processo';

const DnDCalendar = withDragAndDrop(Calendar);

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
      console.log(resultadoAdicionarEventoAgenda)
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
      <Box sx={{ width: '100%' }}>
        <Autocomplete
          multiple
          options={usuarios}
          getOptionLabel={(option: any) => option.nome}
          value={newEvent.usuarios_pertencentes}
          onChange={handleAddItem}

          renderTags={(value, getTagProps) =>
            value.map((option: any, index: any) => (
              <Chip
                {...getTagProps({ index })}
                key={option.id}
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
              sx={{
                '& .MuiInputBase-root': {
                  padding: 0,
                  margin: 0,
                  borderRadius: 0
                },
                '& .MuiOutlinedInput-input': {
                  margin: 0,
                  borderRadius: 0
                },
                '& .MuiInputLabel-root': {
                  margin: 0,
                  borderRadius: 0
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0,
                  '& fieldset': {
                    borderRadius: 0,
                  },
                },
                borderRadius: 0,
                margin: 0, // Remove a margem padrão
              }}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </Box>
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
      console.log(err)
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
    console.log(start, end)
    const idx = events.indexOf(event as never);
    const updatedEvent = { ...event, start, end };

    setEvents(events.map((evt: any, i: any) => (i === idx ? updatedEvent : evt)) as any);

    try {
      const resultadoAdicionarEventoAgenda = await adicionarEventoAgenda({ id: event.id, title: event.title, categoria: event.categoria, usuarios_pertencentes: event.usuarios_pertencentes, start, end });
      console.log(resultadoAdicionarEventoAgenda)
    } catch (err: any) {
      console.error(err)
    }
  };

  const eventPropGetter = (event: any) => {
    const backgroundColor = event.color || '#3174ad';
    return { style: { backgroundColor } };
  };

  const handleSelectEvent = (event: any) => {
    console.log(event)
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
      console.log(error)
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
    console.log(evento)
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
      console.log(resultadoAdicionarEventoAgenda)
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
        <div style={{ width: 800, padding: 40, backgroundColor: 'white', color: '#000', height: '100%', position: 'relative' }}>
          <br /><br /><br />
          <Box display="flex" justifyContent="space-between" alignItems="center" style={{ marginBottom: 20 }}>
            <Typography variant="h6" style={{ color: '#1976D2' }}>
              {newEvent.id ? 'Editar evento' : 'Novo evento'}
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)} style={{ color: '#1976D2' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} style={{ padding: '8px' }}>
              <FormControl fullWidth variant="outlined" sx={{
                '& .MuiInputBase-root': {
                  padding: 0,
                  margin: 0,
                  borderRadius: 0
                },
                '& .MuiOutlinedInput-input': {
                  margin: 0,
                  borderRadius: 0
                },
                '& .MuiInputLabel-root': {
                  margin: 0,
                  borderRadius: 0
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0,
                  '& fieldset': {
                    borderRadius: 0,
                  },
                },
                borderRadius: 0,
                margin: 0, // Remove a margem padrão
              }}>
                <InputLabel style={{ color: '#1976D2' }}>Categoria:</InputLabel>
                <Select
                  value={newEvent.categoria || 'audiencia'}
                  onChange={(e) => setCategoria(e.target.value)}
                  label="Notificação"
                  style={{ color: '#000', borderColor: '#1976D2' }}
                >
                  <MenuItem value="audiencia">Audiência/Sessão</MenuItem>
                  <MenuItem value="reuniao">Reunião</MenuItem>
                  <MenuItem value="prazo">Prazo</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} style={{ padding: '8px' }}>
              <TextField
                label="Título *"
                fullWidth
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                variant="outlined"
                sx={{
                  '& .MuiInputBase-root': {
                    padding: 0,
                    margin: 0,
                    borderRadius: 0
                  },
                  '& .MuiOutlinedInput-input': {
                    margin: 0,
                    borderRadius: 0
                  },
                  '& .MuiInputLabel-root': {
                    margin: 0,
                    borderRadius: 0
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                    '& fieldset': {
                      borderRadius: 0,
                    },
                  },
                  borderRadius: 0,
                  margin: 0, // Remove a margem padrão
                }}
                InputLabelProps={{ style: { color: '#1976D2' }, shrink: true }}
                InputProps={{ style: { color: '#000', borderColor: '#1976D2' } }}
              />
            </Grid>

            <Grid item xs={6} style={{ padding: '8px' }}>
              <FormControl fullWidth variant="outlined" sx={{
                '& .MuiInputBase-root': {
                  padding: 0,
                  margin: 0,
                  borderRadius: 0
                },
                '& .MuiOutlinedInput-input': {
                  margin: 0,
                  borderRadius: 0
                },
                '& .MuiInputLabel-root': {
                  margin: 0,
                  borderRadius: 0
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0,
                  '& fieldset': {
                    borderRadius: 0,
                  },
                },
                borderRadius: 0,
                margin: 0, // Remove a margem padrão
              }}>
                <InputLabel style={{ color: '#1976D2' }}>Notificação</InputLabel>
                <Select
                  value={newEvent.notificacao || 30}
                  onChange={(e) => setNewEvent({ ...newEvent, notificacao: e.target.value } as any)}
                  label="Notificação"
                  style={{ color: '#000', borderColor: '#1976D2' }}
                >
                  <MenuItem value="false">Não notificar</MenuItem>
                  <MenuItem value="10">10 minutos</MenuItem>
                  <MenuItem value="30">30 minutos</MenuItem>
                  <MenuItem value="60">1 hora</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} style={{ padding: '8px' }}>
              <TextField
                label="Adicionar descrição"
                fullWidth
                multiline
                rows={4}
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                variant="outlined"
                InputLabelProps={{ style: { color: '#1976D2' } }}
                InputProps={{ style: { color: '#000', borderColor: '#1976D2' } }}
              />
            </Grid>

            <Grid item xs={12} style={{ padding: '8px' }}>
              <TextField
                value={newEvent.color}
                label="Escolha uma cor para o evento"
                fullWidth
                InputProps={{
                  startAdornment: (
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
                  ),
                }}
                onClick={() => setIsOpen(true)}
                sx={{
                  '& .MuiInputBase-root': {
                    margin: 0,
                    borderRadius: 0
                  },
                  '& .MuiOutlinedInput-input': {
                    margin: 0,
                    borderRadius: 0
                  },
                  '& .MuiInputLabel-root': {
                    margin: 0,
                    borderRadius: 0
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                    '& fieldset': {
                      borderRadius: 0,
                    },
                  },
                  borderRadius: 0,
                  margin: 0, // Remove a margem padrão
                }}
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
            </Grid>

            <Grid item xs={6} style={{ padding: '8px' }}>
              <FormControl fullWidth variant="outlined" sx={{
                '& .MuiInputBase-root': {
                  padding: 0,
                  margin: 0,
                  borderRadius: 0
                },
                '& .MuiOutlinedInput-input': {
                  margin: 0,
                  borderRadius: 0
                },
                '& .MuiInputLabel-root': {
                  margin: 0,
                  borderRadius: 0
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0,
                  '& fieldset': {
                    borderRadius: 0,
                  },
                },
                borderRadius: 0,
                margin: 0, // Remove a margem padrão
              }}>
                <InputLabel style={{ color: '#1976D2' }}>Status</InputLabel>
                <Select
                  value={newEvent.status || "pendente"}
                  onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
                  label="Status"
                  fullWidth
                  style={{ color: '#000', borderColor: '#1976D2' }}
                >
                  <MenuItem value="pendente">Pendente</MenuItem>
                  <MenuItem value="cumprido">Cumprido</MenuItem>
                  <MenuItem value="nao_cumprido">Não cumprido</MenuItem>
                  <MenuItem value="cancelado">Cancelado</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} style={{ padding: '8px' }}>
              <FormControl fullWidth variant="outlined" sx={{
                '& .MuiInputBase-root': {
                  padding: 0,
                  margin: 0,
                  borderRadius: 0
                },
                '& .MuiOutlinedInput-input': {
                  margin: 0,
                  borderRadius: 0
                },
                '& .MuiInputLabel-root': {
                  margin: 0,
                  borderRadius: 0
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0,
                  '& fieldset': {
                    borderRadius: 0,
                  },
                },
                borderRadius: 0,
                margin: 0, // Remove a margem padrão
              }}>
                <Autocomplete
                  fullWidth={true}
                  options={tipos}
                  getOptionLabel={(option: any) => option.nome || ""}
                  renderInput={(params) => <TextField {...params} label="Selecione uma opção" variant="outlined" />}
                  value={newEvent.tipo}
                  onChange={(e: any, value: any) => {
                    calcularConclusaoPrevista({ ...newEvent, tipo: value, prazo: value.prazo } as any);
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6} style={{ padding: '8px' }}>
              <TextField
                label="Prazo"
                fullWidth
                value={newEvent.prazo}
                sx={{
                  '& .MuiInputBase-root': {
                    padding: 0,
                    margin: 0,
                    borderRadius: 0
                  },
                  '& .MuiOutlinedInput-input': {
                    margin: 0,
                    borderRadius: 0
                  },
                  '& .MuiInputLabel-root': {
                    margin: 0,
                    borderRadius: 0
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                    '& fieldset': {
                      borderRadius: 0,
                    },
                  },
                  borderRadius: 0,
                  margin: 0, // Remove a margem padrão
                }}
                onChange={(e) => {
                  calcularConclusaoPrevista({ ...newEvent, prazo: String(e.target.value) })
                }}
                variant="outlined"
                type='number'
                InputLabelProps={{ style: { color: '#1976D2' }, shrink: true }}
                InputProps={{ style: { color: '#000', borderColor: '#1976D2' } }}
              />
            </Grid>

            <Grid item xs={6} style={{ padding: '8px' }}>
              <FormControl fullWidth variant="outlined" sx={{
                '& .MuiInputBase-root': {
                  padding: 0,
                  margin: 0,
                  borderRadius: 0
                },
                '& .MuiOutlinedInput-input': {
                  margin: 0,
                  borderRadius: 0
                },
                '& .MuiInputLabel-root': {
                  margin: 0,
                  borderRadius: 0
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0,
                  '& fieldset': {
                    borderRadius: 0,
                  },
                },
                borderRadius: 0,
                margin: 0, // Remove a margem padrão
              }}>
                <InputLabel style={{ color: '#1976D2' }}>Tipo de contagem do prazo</InputLabel>
                <Select
                  value={newEvent.tipo_contagem_prazo || "dias_uteis"}
                  onChange={(e) => {
                    calcularConclusaoPrevista({ ...newEvent, tipo_contagem_prazo: e.target.value })
                  }}
                  label="Tipos"
                  fullWidth
                  style={{ color: '#000', borderColor: '#1976D2' }}
                >
                  <MenuItem value="selecione">-- Selecione --</MenuItem>
                  <MenuItem value="dias_corridos">Dias corridos</MenuItem>
                  <MenuItem value="dias_uteis">Dias úteis</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} style={{ padding: '8px' }}>
              <StyledDatePickerWrapper style={{ marginLeft: 10, width: "100%" }}>
                <DatePicker
                  selected={newEvent.inicio_previsto as unknown as Date}
                  onChange={(date) => setNewEvent({ ...newEvent, inicio_previsto: date } as any)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="Pp"
                  locale={ptBR}

                  customInput={<CustomInput label="Início previsto/efetivo" sx={{
                    '& .MuiInputBase-root': {
                      padding: 0,
                      margin: 0,
                      borderRadius: 0
                    },
                    '& .MuiOutlinedInput-input': {
                      margin: 0,
                      borderRadius: 0
                    },
                    '& .MuiInputLabel-root': {
                      margin: 0,
                      borderRadius: 0
                    },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 0,
                      '& fieldset': {
                        borderRadius: 0,
                      },
                    },
                    borderRadius: 0,
                    margin: 0, // Remove a margem padrão
                  }} />}
                  wrapperClassName='datepicker'
                  popperPlacement="bottom-start"
                />
              </StyledDatePickerWrapper>
            </Grid>

            <Grid item xs={6} style={{ padding: '8px' }}>
              <StyledDatePickerWrapper style={{ marginLeft: 10, width: "100%" }}>
                <DatePicker
                  selected={newEvent.conclusao_prevista as unknown as Date}
                  onChange={(date) => setNewEvent({ ...newEvent, conclusao_prevista: date } as any)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="Pp"
                  locale={ptBR}
                  customInput={<CustomInput label="Conclusão prevista"
                    sx={{
                      '& .MuiInputBase-root': {
                        padding: 0,
                        margin: 0,
                        borderRadius: 0
                      },
                      '& .MuiOutlinedInput-input': {
                        margin: 0,
                        borderRadius: 0
                      },
                      '& .MuiInputLabel-root': {
                        margin: 0,
                        borderRadius: 0
                      },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 0,
                        '& fieldset': {
                          borderRadius: 0,
                        },
                      },
                      borderRadius: 0,
                      margin: 0, // Remove a margem padrão
                    }}
                  />}
                  wrapperClassName='datepicker'
                  popperPlacement="bottom-start"
                />
              </StyledDatePickerWrapper>
            </Grid>

            <Grid item xs={6} style={{ padding: '8px' }}>
              <ProcessNumberField
                value={newEvent.numero_processo}
                onChange={(e) => setNewEvent({ ...newEvent, numero_processo: e.target.value })}
              />
            </Grid>

            <Grid item xs={6} style={{ padding: '8px' }}>
              <Button
                variant='outlined'
                color='primary'
                fullWidth
                style={{ height: "57px" }}
                startIcon={<SearchIcon style={{ fontSize: 25 }} />}
                onClick={() => pesquisarProcesso()}
              >PESQUISAR PROCESSO</Button>
            </Grid>

            <Grid item xs={4} style={{ padding: '8px' }}>
              <TextField
                label="Órgão julgador"
                fullWidth
                value={newEvent.orgao_julgador}
                onChange={(e) => setNewEvent({ ...newEvent, orgao_julgador: e.target.value })}
                variant="outlined"
                sx={{
                  '& .MuiInputBase-root': {
                    padding: 0,
                    margin: 0,
                    borderRadius: 0
                  },
                  '& .MuiOutlinedInput-input': {
                    margin: 0,
                    borderRadius: 0
                  },
                  '& .MuiInputLabel-root': {
                    margin: 0,
                    borderRadius: 0
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                    '& fieldset': {
                      borderRadius: 0,
                    },
                  },
                  borderRadius: 0,
                  margin: 0, // Remove a margem padrão
                }}
                InputLabelProps={{ style: { color: '#1976D2' }, shrink: true }}
                InputProps={{ style: { color: '#000', borderColor: '#1976D2' } }}
              />
            </Grid>

            <Grid item xs={4} style={{ padding: '8px' }}>
              <StyledDatePickerWrapper
                style={{ marginLeft: 10, width: "100%" }}
              >
                <DatePicker
                  selected={newEvent.data_ajuizamento as unknown as Date}
                  onChange={(date) => setNewEvent({ ...newEvent, data_ajuizamento: date } as any)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="Pp"
                  locale={ptBR}
                  customInput={
                    <CustomInput
                      label="Data de ajuizamento"
                      sx={{
                        '& .MuiInputBase-root': {
                          padding: 0,
                          margin: 0,
                          borderRadius: 0
                        },
                        '& .MuiOutlinedInput-input': {
                          margin: 0,
                          borderRadius: 0
                        },
                        '& .MuiInputLabel-root': {
                          margin: 0,
                          borderRadius: 0
                        },
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 0,
                          '& fieldset': {
                            borderRadius: 0,
                          },
                        },
                        borderRadius: 0,
                        margin: 0, // Remove a margem padrão
                      }}
                    />
                  }
                  wrapperClassName='datepicker'
                  popperPlacement="bottom-start"
                />
              </StyledDatePickerWrapper>
            </Grid>

            <Grid item xs={4} style={{ padding: '8px' }}>
              <TextField
                label="Classe"
                fullWidth
                sx={{
                  '& .MuiInputBase-root': {
                    padding: 0,
                    margin: 0,
                    borderRadius: 0
                  },
                  '& .MuiOutlinedInput-input': {
                    margin: 0,
                    borderRadius: 0
                  },
                  '& .MuiInputLabel-root': {
                    margin: 0,
                    borderRadius: 0
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                    '& fieldset': {
                      borderRadius: 0,
                    },
                  },
                  borderRadius: 0,
                  margin: 0, // Remove a margem padrão
                }}
                value={newEvent.classe}
                onChange={(e) => setNewEvent({ ...newEvent, classe: e.target.value })}
                variant="outlined"
                InputLabelProps={{ style: { color: '#1976D2' }, shrink: true }}
                InputProps={{ style: { color: '#000', borderColor: '#1976D2' } }}
              />
            </Grid>

            <Grid item xs={4} style={{ padding: '8px' }}>
              <TextField
                label="Cliente principal"
                fullWidth
                sx={{
                  '& .MuiInputBase-root': {
                    padding: 0,
                    margin: 0,
                    borderRadius: 0
                  },
                  '& .MuiOutlinedInput-input': {
                    margin: 0,
                    borderRadius: 0
                  },
                  '& .MuiInputLabel-root': {
                    margin: 0,
                    borderRadius: 0
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                    '& fieldset': {
                      borderRadius: 0,
                    },
                  },
                  borderRadius: 0,
                  margin: 0, // Remove a margem padrão
                }}
                value={newEvent.cliente_principal}
                onChange={(e) => setNewEvent({ ...newEvent, cliente_principal: e.target.value })}
                variant="outlined"
                InputLabelProps={{ style: { color: '#1976D2' }, shrink: true }}
                InputProps={{ style: { color: '#000', borderColor: '#1976D2' } }}
              />
            </Grid>

            <Grid item xs={4} style={{ padding: '8px' }}>
              <TextField
                label="Contrário principal"
                fullWidth
                sx={{
                  '& .MuiInputBase-root': {
                    padding: 0,
                    margin: 0,
                    borderRadius: 0
                  },
                  '& .MuiOutlinedInput-input': {
                    margin: 0,
                    borderRadius: 0
                  },
                  '& .MuiInputLabel-root': {
                    margin: 0,
                    borderRadius: 0
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                    '& fieldset': {
                      borderRadius: 0,
                    },
                  },
                  borderRadius: 0,
                  margin: 0, // Remove a margem padrão
                }}
                value={newEvent.contrario_principal}
                onChange={(e) => setNewEvent({ ...newEvent, contrario_principal: e.target.value })}
                variant="outlined"
                InputLabelProps={{ style: { color: '#1976D2' }, shrink: true }}
                InputProps={{ style: { color: '#000', borderColor: '#1976D2' } }}
              />
            </Grid>

            <Grid item xs={4} style={{ padding: '8px' }}>
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
              <Button
                variant="contained"
                onClick={handleSaveEvent}
                fullWidth
                style={{ backgroundColor: '#1976D2', color: '#fff' }}
              >
                Salvar
              </Button>
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
