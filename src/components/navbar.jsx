import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";

export default function NavbarComponent() {
  return (
    <Navbar style={{ backgroundColor: "rgb(30, 40, 255)", color: "white" }}>
      <NavbarBrand>
        <p className="font-bold text-white">Gerenciamento de Tarefas</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link style={{ color: "white" }} href="/cadastrar-usuario">
            Cadastrar Usuário
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link style={{ color: "white" }} href="/cadastrar-tarefa">
            Cadastrar Tarefa
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link style={{ color: "white" }} href="/gerenciar-tarefa">
            Gerenciar Tarefa
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
