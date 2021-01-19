import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import api from '../api.js'
import '../pages/styles/ProgressBar.css'

class BadgeFormEdit extends React.Component{

    //Creo mi objeto controlador de la barra de progreso con los valores de inicio
    progressBar = {
        values: {
            ... this.props.formValues.progressBar
        },
        message: "¡Waiting for your data!",
        variant: "warning"
    }

    handleSubmit = async e => {
        this.progressBar = {
            ... this.progressBar,
            values:{
                ... this.progressBar.values,
                async_api: 0
            },
            error: false,
            error_api: false
        }
        
        try{
            await api.badges.create(this.props.badgeId, this.props.formValues.form);
        }catch (err){
            this.progressBar = {
                ... this.progressBar,
                variant: "danger", //Color rojito
                error: false, //Error
                error_api: true,
                error_api_msg: err,
            }

            this.progressBar = {
                ... this.progressBar,
                message: `¡Ha ocurrido un error con el API: ${this.progressBar.error_api_msg}`, //Mensaje de error
            }
        }
    }

    //Este método se llamará cada vez que alguna de los elementos <Input/> sea deseleccionado: onBlur() on React
    handleProgressBarChange = (event) => {
        //Convierto el objeto con los valores de los formularios que me llega desde PROPS, IMPORTANTE, 
        //porque sino nunca tendríamos los valores de entrada del formulario.
        const list = Object.keys(this.props.formValues.progressBar).map((key) => [String(key), this.props.formValues.form[key]]);

        //formInput es el resultado dentro del array list, donde element === event.target.value, osea, que el elemento 
        //sea igual al valor que nos vino por el evento:
        //si este evento lo ejecuta el <Input name="firstName"/>, formInput será el array dentro de list, 
        //que tenga el valor de entrada de firstName
        const formInput = list.find(index => index.find(element => element === event.target.value) )
        //value es el valor que se le asignará a nuestro objeto controlador de la progressbar cada vez que sea llamado el evento, 
        //tengo 5 inputs, pero agregé 1 para la llamada al API (simulada)
        //entonces cada input tendría un valor total en la progressbar de 16.66667%
        //Si formInput está indefinido, se asigna 0, si no, luego se comprueba que el valor 1 en el array formInput, 
        //sea igual al parámentro de entrada del <Input/> que accionó el evento,
        //Sí es true, 16.6667, sino, 0.
        const value = (formInput === undefined) ? 0 : (formInput[1] === event.target.value) ? 16.66667 : 0;

        //Hacemos una copia del objeto progressbar, solo cambiando en values, el valor que hemos detectado en el evento.
        this.progressBar = {
            ... this.progressBar,
            values: {
                ... this.progressBar.values,
                [event.target.name]: value
            }
        }
        //forzamos update del componente para que este dato de progressbar llegue a nuestro componente de Bootstrap, <Progressbar/>
        //Esto desencadenará que siga nuestro algoritmo en componentWillUpdate()
        this.forceUpdate();
    }

    handleLeaveFocus = e => {
      this.handleProgressBarChange(e);
    }

    renderProgressBar = () => {
        //Inicializo las vars
        this.progressBar = {
            ... this.progressBar,
            values: {
                ... this.progressBar.values,
                async_api: 0
            },
        }
        let perc = 0;
        let message;
        let variant;
        
        //Convierto this.progressBar.values en un Array para poder hacer forEach
        const list = Object.keys(this.progressBar.values).map((key) => [String(key), this.progressBar.values[key]]);

        //Hago un forEach para sumar, todos los valores de cada uno de los <Input/>, que hayan activado el evento de onBlur()
          list.forEach(element => {
             perc += element[1];
          });

        const withoutData = (5 - (perc / 16.66667)); //Variable para saber cuantas casillas hay sin datos
        //Aquí manejamos los mensajes y las variantes de color de nuestra <Progressbar>
        console.log(this.progressBar)
        message = (withoutData <=0) ? (this.progressBar.success 
            ? this.progressBar.message : (this.progressBar.error_api 
            ? `¡Ha ocurrido un error con el API: ${this.progressBar.error_api_msg}` : "¡Tú Badge está lista, ¿No quedó genial?!")) 
            : (this.progressBar.error ? "¡Necesitas rellenar todos los datos!" : "¡Faltan " + withoutData + " casillas por completar!");
        //Basicamente lo mismo que arriba pero con los colores de variantes
        variant = (withoutData <= 0) 
        ? this.progressBar.variant : (this.progressBar.error 
        ? this.progressBar.variant : (this.progressBar.error_api 
        ? this.progressBar.variant : "warning"))
        //Cambiamos los valores de nuestro controlador para agregar el porcentaje, que este valor usará <ProgressBar/>
        this.progressBar = {
            ... this.progressBar,
            porcent: perc,
            message: message,
            variant: variant,
            error: false,
            error_api: false
        }
        
        if(this.progressBar.redirect){
           
            setTimeout(() => {
                this.props.history.push('/badges');
            }, 1000)

        }

    }
    
    componentWillUpdate(){
        //Es importante que sea componentWillUpdate() y no componentDidUpdate()
        //¿Porqué? Es porque componentWillUpdate ejecutará los métodos de este bloque antes de renderizar
        //entonces nuestro componente <Progressbar/> podrá actualizarse con los valores que vamos a declarar en renderProgressBar()
        this.renderProgressBar();
    }

    submitApi = e => {
        this.progressBar = {
            ... this.progressBar,
            values: {
                ... this.progressBar.values,
                async_api: 0
            },
        }
        //Cuando el usuario haga Submit, se ejecuta esta función que es una función padre entre la que recibimos por props de BadgeNew.js
        //y la que necesitamos para simular nuestro API

        //Prevenimos recarga
        e.preventDefault();
        //Si no hay casillas vacías
        if((this.progressBar.porcent / 16.66667) >= 5 && this.progressBar.error_api === false){
        this.handleSubmit();
        
        

        //Esto significa que todo correcto, entonces actualizamos nuestro controlador
        if(this.progressBar.error_api === false){
            this.progressBar = {
                ... this.progressBar,
                values: {
                    ... this.progressBar.values,
                    //Aquí async_api es el 6to miembro de nuestro 100% para la <ProgressBar>, le daremos también su 16.6667%
                    async_api: 16.66667
                },
                message: "¡Tu badge ha sido enviada a nuestra API!", //Mensaje para confirmar que todo bien
                variant: "success", //ProgressBar de color verde
                error: false, //Sin errores
                error_api: false,
                success: true,
                redirect: true //Todo correcto
            }
        }

        }else{ //Sino, algo salió mal/no llenó todas las casillas
            this.progressBar = {
                ... this.progressBar,
                values: {
                    ... this.progressBar.values,
                    async_api: 0 //Nuestro 6to miembro de la <ProgressBar/>, con 0.
                },
                variant: "danger", //Color rojito
                error: ((this.progressBar.porcent / 16.66667) >= 5) ? false : true,
                redirect: false,
                error_api: this.progressBar.error_api == Boolean ? this.progressBar.error_api : false, //Error
                error_api_msg: this.progressBar.error_api_msg,
                message: (this.progressBar.error_api) ? `¡Ha ocurrido un error con el API: ${this.progressBar.error_api_msg}` 
                : "¡Tienes que rellenar todas las casillas!", //Mensaje de error
            }
        }
        this.forceUpdate() //Forzamos update para que la progressBar se refresque
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitApi}>
                    <div className="form-group">
                        <label>First name</label>
                        <input onBlur={this.handleLeaveFocus} onChange={this.props.onChange} className="form-control" type="text" name="firstName" value={this.props.formValues.form.firstName}/>
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input onBlur={this.handleLeaveFocus} onChange={this.props.onChange} className="form-control"  type="text" name="lastName" value={this.props.formValues.form.lastName}/>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input onBlur={this.handleLeaveFocus} onChange={this.props.onChange} className="form-control" type="email" name="email" value={this.props.formValues.form.email}/>
                    </div>

                    <div className="form-group">
                        <label>JobTitle</label>
                        <input onBlur={this.handleLeaveFocus} onChange={this.props.onChange} className="form-control"  type="text" name="jobTitle" value={this.props.formValues.form.jobTitle}/>
                    </div>

                    <div className="form-group">
                        <label>Twitter</label>
                        <input onBlur={this.handleLeaveFocus} onChange={this.props.onChange} className="form-control"  type="text" name="twitter" value={this.props.formValues.form.twitter}/>
                    </div>

                    <div className="Submit-ProgressBar">
                        <button type="submit" className="btn btn-primary">Save</button>
                        <div className="Submit-ProgressBar__subgrid">
                            <p>{this.progressBar.message}</p>
                            <ProgressBar animated variant={this.progressBar.variant} now={this.progressBar.porcent} />
                        </div>
                        
                    </div>

                    
                </form>
            </div>
        )
    }
    
}

export default BadgeFormEdit