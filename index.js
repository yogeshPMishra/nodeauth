const app = require('./app');
const {PORT} = process.env;
app.listen(PORT,()=>{
    console.log(`Server is Live on Port ${PORT}`);
})