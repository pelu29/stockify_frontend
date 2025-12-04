export class Usuario{
    public username:string;
    public last_name:string;
    public email:string;
    public telefono:number;
    protected password:string;

    constructor(nombres:string,apellidos:string,correo:string,telefono:number, contraseña:string){
        this.username = nombres;
        this.last_name = apellidos;
        this.email = correo;
        this.telefono = telefono;
        this.password = contraseña;
    }
}