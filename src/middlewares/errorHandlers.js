let errorHandler = (error,_req,res,_next) => {
    console.log(error)
    res.status(500).json({
        success: false,
        message: error.message,
    })
}

export default errorHandler;