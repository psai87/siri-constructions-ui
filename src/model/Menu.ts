export interface Menu {
    name: string;
    path: string | undefined;
    submenu: MenuItem[] | [] | undefined;
}

export interface MenuItem {
    name: string;
    path: string;
}