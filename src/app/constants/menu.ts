export interface IMenuItem {
  id?: string;
  icon?: string;
  label: string;
  to: string;
  newWindow?: boolean;
  subs?: IMenuItem[];
}

const data: IMenuItem[] = [
  {
    id: 'vien',
    icon: 'iconsminds-home',
    label: 'Inicio',
    to: '/app/vien/start'
  },
  {
    id: 'perfil',
    icon: 'iconsminds-administrator',
    label: 'Perfil',
    to: '/app/vien/perfil'
  },
  {
    id: 'ofertas',
    icon: 'iconsminds-management',
    label: 'Ofertas Laborales',
    to: '/app/vien/ofertas'
  },
  {
    id: 'eventos',
    icon: 'iconsminds-cinema',
    label: 'Eventos',
    to: '/app/vien/eventos'
  },
  {
    id: 'asesorias',
    icon: 'iconsminds-students',
    label: 'Asesorias',
    to: '/app/vien/asesorias'
  },/*
  {
    id: 'gestor',
    icon: 'iconsminds-statistic',
    label: 'Gestor de Carreras',
    to: '/app/vien/gestorcarreras'
  },*/
  {
    id: 'networking',
    icon: 'iconsminds-network',
    label: 'Networking',
    to: '/app/vien/networking'
  },
  {
    id: 'blankpage',
    icon: 'iconsminds-shop',
    label: 'Emprendedores',
    to: '/app/vien/emprendedores'
  },
  {
    id: 'enlaces',
    icon: 'iconsminds-link',
    label: 'Enlaces',
    to: '/app/vien/enlaces'
  }

];
export default data;
