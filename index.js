
//?-L2----------👇👇
require('dotenv').config();
//?-L2----------👆👆
const PORT = process.env.PORT || 5001;
const app = require('./app');


app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});