// Create a subscription => middleware => error middleware (check for renewal date)=> middleware (check for errors) => next => controller

const errorMiddleware = (err,req,res,next) =>{
    try{
        let error ={...err};

        error.message = err.message;

        console.error(err);
        
        //Mongoose  bad objecId
        if(err.name === 'CastError'){
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode =404;
        }

        // Mongoose duplicte key
        if (err.name === 11000) {
            const message = 'Duplictae feild value entred';
            error = new Error(message);
            error.statusCode = 400;
        }

        // Mongoose validate error
        if (err.name === 'validationError'){
            const message = Object.values(err.error).map(val => val.message);
            error= new Error(message.join(', '));
            error.statusCode=400;
        }

        res.status(error.statusCode || 500).json({succes:false,error:error.message || 'Server Error'})       

    }catch(error){
        next(error);
    }
};

export default errorMiddleware;

