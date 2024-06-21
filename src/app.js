const express = require("express");
require("./db/conn")
const Student = require("./models/students")

const app = express();
const port = process.env.PORT || 5000

app.use(express.json())

//Insert the data in BD
app.post("/students", async (req, res) => {

    const user = new Student(req.body)
    user.save().then(() => {
        res.status(200).json({
            success: true,
            message: 'Student Successfully Crteated',
        });
    }).catch((e) => {
        res.send(e);
    })


})
// read the data from db

app.get("/students", async (req, res) => {

    try {
        const studentdata = await Student.find();
        res.status(200).send(studentdata);
    } catch (e) {
        res.status(400).send(e);
    }
})
// Update Studentdata by it ID

app.patch("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id, req.body);
//    console.log(updateStudent.name)
        // if(updateStudent.name==""||updateStudent.email==""||updateStudent.phone==""||updateStudent.address ==""){
        //     res.status(400).json({
        //         success: true,
        //         message: 'Feild is Empty',
        //     });
        // }else{
            res.status(200).json({
                success: true,
                message: 'Student Upadate Successfully',
            });
        // }
       
    } catch (e) {
        res.status(404).send(e)
    }
})

// Delete Studentdata By Its Id

app.delete("/students/:id", async (req, res) => {

    try{
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndDelete(_id, req.body);

        res.status(200).json({
            success: true,
            message: 'Student Delete Successfully',
        });

        if(!_id){
            return res.status(400).send();
        }
    }catch(e){
        res.status(500).send(e)
    }
})

app.listen(port, () => {
    console.log(`Connection is setup at ${port}`);
})