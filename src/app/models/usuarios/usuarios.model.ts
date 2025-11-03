export class Usuario{
    public Nombres:string;
    public Apellidos:string;
    public Correo:string;
    public Telefono:number;
    protected Contraseña:string;

    constructor(nombres:string,apellidos:string,correo:string,telefono:number, contraseña:string){
        this.Nombres = nombres;
        this.Apellidos = apellidos;
        this.Correo = correo;
        this.Telefono = telefono;
        this.Contraseña = contraseña;
    }
}