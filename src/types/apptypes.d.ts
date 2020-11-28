interface DocData {
    id?: string;
}
interface Usuario extends DocData {
    nombre: string;
    correo: string;
    isAdmin: boolean;
    semestre: number;
}

interface InfoPublicacion extends DocData {
    fechaCreacion: Date;
    fechaModificacion: Date;
    titulo: string;
    contenido: string;
    autor_id: string;
    estado: 'Resuelta' | 'Abierta';
}

interface  Pregunta extends DocData {
    numVotos: number;
    resuelta: boolean;
    respuesta_aceptada_id?: string;
    info_id: string; 
}