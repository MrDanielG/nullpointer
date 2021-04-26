interface DocData {
    id: string;
}
interface Usuario extends DocData {
    nombre: string;
    correo: string;
    isAdmin: boolean;
    semestre: number;
}

interface Post extends DocData {
    fechaCreacion: Date;
    fechaModificacion: Date;
    titulo?: string;
    contenido: string;
    autor_id: string;
    numVotos: number;
    resuelto: boolean;
    respuesta_aceptada_id?: string;
    tags?: string[];
}

interface Like extends DocData {
    idUser: string;
    idPost: string;
}
