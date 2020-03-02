<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="new.css">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
  <meta name='viewport' content='width=device-width, initial-scale=1'>
  <script src='https://kit.fontawesome.com/a076d05399.js'></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular.min.js"></script>

</head>
<body>
  <div ng-app="mainapp" ng-controller ="democontroller">
    <h2> Student Registration Form </h2>
      <form name="one" id="alt" method="POST" action="/login"class="was-validated" >
        <table align="center" cellpadding="10">
          <tr>
              <td> First Name </td>
              <td> <input type="text" class="form-control" name="fname" maxlength="20" placeholder="firstname"  ng-model ="student.fname" required  > </td>
                
          </tr>
           
          <tr>
            <td> Last Name </td>
            <td> <input type="text" class="form-control" name="lastname" maxlength="20" placeholder="lastname"  ng-model="student.lname" required > </td>
          </tr>

          <tr>
            <td> Date Of Birth </td>
            <td> <input type="date" class="form-control" ng-model ="student.dob" required> </td>
          </tr>
          <tr>
            <td> Gender </td>
            <td> Male <input type="radio" ng-model="student.gender" value="male">
            Female <input type="radio" ng-model="student.gender" value="female">    
            </td>
          </tr>
          <tr>
            <td> Email Id </td>
            <td> <input type="Email" class="form-control" name="Email" placeholder="Email id" ng-model="student.mail" required ></td>
          </tr> 
          <tr>
            <td> Mobile Number </td>
            <td> <input type="number" class="form-control" name="number"  ng-model="student.phn" required> </td>
          </tr>
          <tr>
            <td> Address </td>
            <td> <textarea name="Address" rows="4" cols="20" maxlength="50"   ng-model="student.area" class="form-control" required> </textarea> </td>
          </tr>
          <tr>  
            <td>Country </td>
            <td> <select  ng-model="student.place" class="form-control" required>
            <option value = selected>[choose yours]</option>
            <option value="India" >Ind </option>
            <option value="Newzeland">New </option></select></td>
          </tr>
          <tr>
            <td colspan="2" align="right">
            <input type="button"  value="submit" ng-click="submit()"  class="btn btn-primary">
            <input type="button" value="Reset" ng-click="reset()"  class="btn btn-primary"> 

            </td>
          </tr>
        </table>
      </form>

        <P id="demo"></P>
        <table id="Mytable" class="table-hover table-dark "  border="1" align ="center" cellpadding="10">
          <tr>
            
            <th>ID</th>
            <th>First Name  </th>
            <th>Last Name </th>
            <th>Date Of Birth </th>
            <th>Gender </th>
            <th>Email Id  </th>
            <th>Mobile Number </th>
            <th>Address</th>
            <th>Country</th>
            <th></th>
          </tr>
          <tr ng-repeat="stuu in studentList">
            
            <td>{{stuu.Id = $index+1}} </td>
            <td> {{stuu.fname}}</td>
            <td> {{stuu.lname}} </td>
            <td> {{stuu.dob}} </td>
            <td> {{stuu.gender}} </td>
            <td> {{stuu.mail}} </td>
            <td> {{stuu.phn}} </td>
            <td> {{stuu.area}} </td>
            <td> {{stuu.place}} </td>
            <td> <i class='fas fa-edit'  ng-click="bindSelectedData($index)"> </i> </td>
            <td> <i  class="fa fa-times" ng-click=delete($index)> </i> </td>
           
                  
           
           
          </tr>
        </table>
          
      </form>
    </div>
  
<script>
  var app=angular.module("mainapp",[]);
  app.controller("democontroller",function ($scope,$http){

    $scope.student={};
    $scope.studentList=[];
//on load function data view
    var getPageInfo = function(){
      console.log("115")
        $http.get('/api/find').success(function(data) {
          console.log(data)
           $scope.studentList = data.data;
        });   
      }
      getPageInfo();

    /*
    Validate the form and submit and update
    @param {} ,
    */
    $scope.submit =function(){
      
        
      if ($scope.student.fname=="") {
        alert("Enter the first name");
        return;
      }

      else if ($scope.student.lname=="") {
        alert("Enter the last  name");
        return;
      }
      else if ($scope.student.gender==false) {
        alert("Select your gender");
        return;
      }

      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!filter.test($scope.student.mail))  {
        alert("Please enter valid email address");
        return;
      }
        //console.log($scope.student.phn)
      if ($scope.student.phn=="" ||$scope.student.phn==undefined ) {
          
        alert("Enter mobile number");
        return;
      }
      else if ($scope.student.area=="") {
        alert("Enter your address");
        return;
      }
          //console.log($scope.student.place)
      else if ($scope.student.place=="" || $scope.student.place==undefined ) {
          
        alert("Select you country");
        return;
      }
      console.log($scope.student.Id)
     
       if ($scope.student.Id ==undefined || $scope.student.Id=="") {
             
              


          $http.post('/api/stu',$scope.student).success(function(data){
            console.log(data.data)
             if(data.data){
             $scope.studentList.push(data.data);
              // $scope.student=data.data;
              // console.log($scope.student)
              $scope.clearModel()
              }
              else{
                alert("duplicate value")
                $scope.clearModel()
              }
             
              
          }).error(function() {
              console.log(" 404 - File not found");
              
          });
             



         //  $http.get('/api/call'+ $scope.stuDetails[0].fname).success(function(data) {
         //   console.log(data)
           
           
         // }).error(function() {
         //             console.log(" 404 - File not found");
         //  })
       }
      
      else {
        
        $.grep($scope.studentList,function(studentDetails){
          console.log(studentDetails)
        if(studentDetails.Id==$scope.student.Id) {
            studentDetails.fname=$scope.student.fname;
            studentDetails.lname=$scope.student.lname;
            studentDetails.dob=$scope.student.dob;
            studentDetails.mail=$scope.student.mail;
            studentDetails.phn=$scope.student.phn;
            studentDetails.gender=$scope.student.gender;
            studentDetails.area=$scope.student.area;
            studentDetails.place=$scope.student.place;
        }

        });
           
          $http.post('/api/update',$scope.student).success(function(data){
               
               $scope.student=data.data;
                console.log($scope.student)
                $scope.clearModel()
                 
          }).error(function(){
               console.log(" 404 - File not found");
          });
      }
    }
    $scope.delete=function(id){

     $http.get("/api/del/"+$scope.studentList[id]._id).success(function(){
        
            
             $scope.studentList.splice(id, 1);
         
          
      });
      

    }
    /*
    edit the row value
    @param {index value} studentDetails
    */
    $scope.bindSelectedData=function(selctRowIndex) {
      
      $scope.student._id=$scope.studentList[selctRowIndex]._id;
      $scope.student.Id=$scope.studentList[selctRowIndex].Id;
      $scope.student.fname=$scope.studentList[selctRowIndex].fname;
      $scope.student.lname=$scope.studentList[selctRowIndex].lname;
      $scope.student.dob=$scope.studentList[selctRowIndex].dob;
      $scope.student.mail=$scope.studentList[selctRowIndex].mail;
      $scope.student.phn=$scope.studentList[selctRowIndex].phn;
      $scope.student.gender=$scope.studentList[selctRowIndex].gender;
      $scope.student.area=$scope.studentList[selctRowIndex].area;
      $scope.student.place=$scope.studentList[selctRowIndex].place;
          

    }

    $scope.clearModel=function() {
      $scope.student={};
      // $scope.student.fname="";
      // $scope.student.lname="";
      // $scope.student.dob="";
      // $scope.student.mail="";
      // $scope.student.phn="";
      // $scope.student.gender="";
      // $scope.student.area="";
      // $scope.student.place="";
    }
      
    $scope.reset=function(){
     $scope.clearModel()
    }
  
});
     
</script> 
</body> 
</html> 
