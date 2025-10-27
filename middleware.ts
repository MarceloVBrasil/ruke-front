import { NextRequest, NextResponse } from "next/server";
export default function middleware(request: NextRequest) {
  try {
    if (request.nextUrl.pathname === "/refreshToken") {
      const newToken = request.nextUrl.searchParams.get("token") as string;
      const newRegras = request.nextUrl.searchParams.get("regras") as string;
      const redirectUrl = request.headers.get("referer") as string;
      const response = NextResponse.redirect(new URL(redirectUrl, request.url));
      response.cookies.set("ruke_token", newToken);
      response.cookies.set("regras", newRegras);
      return response;
    }

    const token = request.cookies.get("ruke_token");
    const refreshToken = request.cookies.get("refreshToken");
    const regras = request.cookies.get("regras");
    if (!token || !refreshToken || !regras) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!middlewarePermission(request)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch (e: any) {
    throw new Error(e);

  }
}
export function middlewarePermission(request: NextRequest) {
  try {
    const regras: any = request.cookies.get("regras");
    if (!regras) return false;

    const regrasArray = JSON.parse(regras.value);
    if (!regrasArray) return false;

    const menusPermitidos: any = request.cookies.get("menusPermitidos");
    if (!menusPermitidos) return false;

    const menusPermitidosArray = JSON.parse(menusPermitidos.value).map(
      (menu: any) => menu.nome
    );
    if (!menusPermitidosArray) return false;

    const permissoesRotas: any = {
      usuarios: {
        "/users": ["getAll", "add", "update", "delete", "agenda"],
      },
      tenants: {
        "/tenants": ["getAll", "add", "update", "delete"],
      },
      produtos: {
        "/produtos": ["getAll", "add", "update", "delete"],
      },
      planos: {
        "/planos": ["getAll", "getAllByProdutoId", "add", "update", "delete"],
      },
      parceiros: {
        "/parceiros": ["getAll", "add", "update", "delete"],
      },
      superendividamento: {
        "/superendividamento": ["getAll", "add", "update", "delete"],
      },
      trabalhista: {
        "/trabalhista": ["getAll", "add", "update", "delete"],
      },
      RMC: {
        "/tickets": ["getAll", "getById", "add", "update", "delete"],
        menuPermitido: ["RMC"],
      },
      BPC: {
        "/bpc": ["getAll", "getById", "add", "update", "delete"],
        menuPermitido: ["BPC"],
      },
      agenda: {
        "/agenda": ["getAll", "getById", "add", "update"],
        menuPermitido: ["agenda"]
      }
    };
    let allowedPermission = false;
    const url = request.nextUrl.pathname;
    const dominioAtual = Object.keys(permissoesRotas).find((permissao: any) => {
      return Object.keys(permissoesRotas[permissao]).find(
        (urlPermissao: any) => {
          if (url.startsWith(urlPermissao)) {
            return permissao;
          }
        }
      );
    });

    if (dominioAtual) {
      let permissaoMenu = true;
      const restricaoMenus = permissoesRotas[dominioAtual].menuPermitido;
      if (restricaoMenus) {
        for (const restricao of restricaoMenus) {
          if (!menusPermitidosArray.includes(restricao)) {
            permissaoMenu = false;
          }
        }
      }

      if (!permissaoMenu) {
        return permissaoMenu;
      }
    }

    for (const regra of regrasArray) {
      if (dominioAtual) {
        if (permissoesRotas[dominioAtual]) {
          Object.values(permissoesRotas[dominioAtual]).forEach(
            (permissoesArray: any) => {
              if (regra.dominio === dominioAtual) {
                for (const permissao of regra.permissoes) {
                  if (permissoesArray.includes(permissao)) {
                    allowedPermission = true;
                  }
                }
              }
            }
          );
        }
      }
    }
    return allowedPermission;
  } catch (err) {
    return false;
  }
}

export const config = {
  matcher: [
    "/tenants/:path*",
    "/refreshToken",
    "/tickets/:path*",
    "/planos/:path*",
    "/superendividamento/:path*",
    "/trabalhista/:path*",
    "/produtos/:path*",
    "/parceiros/:path*",
    "/bpc/:path*",
    "/agenda"
  ],
};
