/** Nombres de icono disponibles en OSIcon.astro. */
export type OSIconName =
  | 'folder'
  | 'internet'
  | 'notepad'
  | 'mail'
  | 'image'
  | 'window'
  | 'windows';

/** Datos de la ventana abierta en una ruta (botón de la taskbar, título…). */
export interface OSWindowInfo {
  title: string;
  icon: OSIconName;
}
