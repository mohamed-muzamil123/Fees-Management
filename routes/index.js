var express = require('express');
var router = express.Router();
var db =require('../config/connection')
var studentHelpers = require('../helpers/student-helpers')


/* GET home page. */
router.get('/', function(req, res, next) {
  
  studentHelpers.getAllStudents().then((student)=>{
  
    
    res.render('index', {student} );
  })


});

router.get('/add-student',(req,res)=>{
  res.render('/add-student')
})

router.post('/add-student',function(req,res){

 studentHelpers.addStudent(req.body,(callback)=>{
    
res.redirect('/')

 })
  
})

router.get('/students',(req,res)=>{
  studentHelpers.getAllStudents().then((student)=>{
    res.render('students',{student})
  })

})

router.get('/student-details/:id',async(req,res)=>{
  
  
let student = await studentHelpers.getStudentDetails(req.params.id)
console.log(student);      

  res.render('student-details',{student})
})  



router.post('/fees-paid',(req,res)=>{
studentHelpers.addFees(req.body).then((result) => {
  var id =req.body._id
  
  res.redirect('/student-details/'+id)
  
})



  
  
})

// Search route
// Search route
router.get('/search', async (req, res) => {
  try {
    const query = req.query.query;
    
    // Search in multiple fields (name, admission number, class, etc.)
    const students = await Student.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { admssion: { $regex: query, $options: 'i' } },
        { class: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } }
      ]
    });
    
    // Render the same page but with filtered results
    res.render('your-view-file', { 
      student: students,
      searchQuery: query
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred during search');
  }
});




module.exports = router;


