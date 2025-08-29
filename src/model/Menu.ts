export interface Menu {
    name: string;
    path: string | undefined;
    submenu: Menu[] | [] | undefined;
    createdTime: string;
}