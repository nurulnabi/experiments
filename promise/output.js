/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-03-15 16:23:38
* @Last Modified by:   noor
* @Last Modified time: 2017-03-18 20:20:40
*/

api.get('/getCourses/:lecturer_id', (req, res) => { 
    let myCourses = [];
    let send = true;
    Lecturer.findById(req.params.lecturer_id, (err, lecturer) => {
      if(err) {
        res.json({ ok : '0'});
      } else {
        
        Promise.all(lecturer.courses.map(function(value){
          return Course.findById(value).exec();
        })).then(function(allCourses){
          //allCourses is array of courses
          res.json(allCourses);
        }).catch(function(err){
          //error happened while fetching courses
        })
      }
    });
  });
