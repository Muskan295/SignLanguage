const express=require('express');
const cors=require('cors');
const path=require('path');
const PORT=5000;
const app=express();
app.use(cors());
app.use(express.json());
app.use('/api/alphabet',require('./routes/alphabetRoutes'));
app.use('/api/words',require('./routes/wordRoutes'));
app.use('/api/quiz',require('./routes/quizRoutes'));
app.use('/api/modules',require('./routes/moduleRoutes'));
app.use('/api/auth',require('./routes/authRoutes'));

app.use(express.static(path.join(__dirname,'..','client','dist')));

app.get('{*path}',(req,res)=>{
        res.sendFile(path.join(__dirname,'..','client','dist','index.html'));
});

app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
})