$(".edu_btn").click(function () {
  $("#edu_remove").removeClass("hidden");

  $(
    ".education-details"
  ).last().after(`<div class="row px-5 education-details education-details2" id="edu_row2">
      <div class="col-md-6 py-2">
          <input type="text" class="form-control mb-2 doc_institution"placeholder="Institution" required>
          <div class="position-relative">
            <input type="text" class="form-control mb-2 doc_start_date date" placeholder="Starting Date" required>
              <span class="position-absolute cal-icon1"><i class="fal fa-calendar "></i></span>
          </div>
          <input type="text" class="form-control doc_degree" placeholder="Degree"required>
        </div>
     
      <div class="col-md-6">
        <div class="py-2">
          <input type="text" class="form-control mb-2 doc_subject" placeholder="Subject"required>
          <div class="position-relative">
            <input type="text" class="form-control mb-2 doc_completion_date date" placeholder="Completion Date" required>
            <span class="position-absolute cal-icon1"><i class="fal fa-calendar "></i></span>
          </div>
          <input type="text" class="form-control doc_grade" placeholder="Grade" required>
        </div>
      </div>
    </div>`);
  initdatepicker();
});

$(".service_btn").click(function () {
  $("#service_remove").removeClass("hidden");

  $(
    ".service-details"
  ).last().after(`<div class="row px-5 service-details service-details2" id="service_row2">
      <div class="col-md-6 py-2">
          <input type="text" list="search2" class="form-control mb-2 doc_service" placeholder="Service name" required>
      </div>
     

    </div>`);
});

$(".exp_btn").click(function () {
  $("#exp_remove").removeClass("hidden");

  $(".experience-details")
    .last()
    .after(
      `<div class="row px-5 experience-details experience-details2" id="exp_row2"><div class="col-md-6"><div class="py-2"><input type="text" class="form-control mb-2 doc_company_name" placeholder="Company Name" required><input type="text" class="form-control mb-2 doc_job" placeholder="Job Position" required><div class="position-relative"><input type="text" class="form-control doc_period_to_date date" placeholder="Period To" required><span class="position-absolute cal-icon"><i class="fal fa-calendar "></i></span></div></div></div><div class="col-md-6"><div class="py-2"><input type="text" class="form-control mb-2 doc_location" placeholder="Location"required><div class="position-relative"><input type="text" class="form-control doc_period_from_date date"placeholder="Period From" required><span class="position-absolute cal-icon"><i class="fal fa-calendar "></i></span></div></div></div></div>`
    );
  initdatepicker();
});

// $('.edu_remove').click(function(e) {
//   e.preventDefault();
//   $(this).parents().remove();
// });

$("#edu_remove").click(function () {
  $(".education-details2").last().remove();

  if ($(".education-details2").length == 0) {
    $("#edu_remove").addClass("hidden");
  }
});

$("#service_remove").click(function () {
  if ($(".service-details2").length > 0) {
    $(".service-details2").last().remove();
    if ($(".service-details2").length == 0) {
      $("#service_remove").addClass("hidden");
    }
  } else {
    $(".service-details").last().remove();

    if ($(".service-details").length == 1) {
      $("#service_remove").addClass("hidden");
    }
  }
});

$("#exp_remove").click(function () {
  $(".experience-details2").last().remove();

  if ($(".experience-details2").length == 0) {
    $("#exp_remove").addClass("hidden");
  }
});
function numberOnly() {
  var element = document.getElementById("number");
  element.value = element.value.replace(/[^0-9]/gi, "");
}

function submitform(event) {
  event.preventDefault();
  // Basic Doctor details

  let doc_name = document.querySelector(".doc_fname");
  let doc_date = document.querySelector(".doc_date");
  let doc_lname = document.querySelector(".doc_lname");
  let doc_gender = document.querySelector(".doc_gender");

  // Doctor Contact details
  let doc_address = document.querySelector(".doc_address");
  let doc_country = document.querySelector(".doc_country");
  let doc_number = document.querySelector(".doc_number");
  let doc_state = document.querySelector(".doc_state");
  let doc_pincode = document.querySelector(".doc_pincode");
  let doc_email = document.querySelector(".doc_email");
  let placeid = document.querySelector("#placeid");
  let doc_about = $("#doctorabout").val();
  let doctorbanner = $("#pic_img2").val();
  let doc_profile = $("#pic_img3").val();
  let doc_designation = $("#doc_designation").val();
  let doc_department = $("#doc_department").val();
  let imgsrc;
  let urlname = $("#urlname").val();
  //if (urlname == "") {
   var extrainfo = getQuillHtml();
  //}
  let servicearr = [];

  let education_arr = [];

  $(".doc_service").each(function (e, i) {
    let service_name = $(this).val();
    let service_img, service_desc, service_id, service_displayurl;

    $("#search2 option").each(function (e, i) {
      if ($(this).val() == service_name) {
        service_img = $(this).attr("data-serviceimg");
        service_desc = $(this).attr("data-servicedesc");
        service_id = $(this).attr("data-serviceid");
        service_displayurl = $(this).attr("data-service_displayurl")
      }
    });

    servicearr.push({
      service_name,
      service_img,
      service_desc,
     service_id,
     service_displayurl
    });
  });

  console.log(servicearr);

  $(".education-details").each(function (e, i) {
    let institution = $(this).find(".doc_institution").val();
    let startingDate = $(this).find(".doc_start_date").val();
    let degree = $(this).find(".doc_degree").val();
    let subject = $(this).find(".doc_subject").val();
    let completedDate = $(this).find(".doc_completion_date").val();
    let grade = $(this).find(".doc_grade").val();

    let obj = {
      institution,
      startingDate,
      degree,
      subject,
      completedDate,
      grade,
    };
    education_arr.push(obj);
  });
  let experience_arr = [];
  $(".experience-details").each(function (e, i) {
    let company = $(this).find(".doc_company_name").val();
    let jobposition = $(this).find(".doc_job").val();
    let periodto = $(this).find(".doc_period_to_date").val();
    let location = $(this).find(".doc_location").val();
    let periodfrom = $(this).find(".doc_period_from_date").val();

    let obj1 = {
      company,
      jobposition,
      periodto,
      location,
      periodfrom,
    };
    experience_arr.push(obj1);
  });
  const fileInput = document.querySelector("#profile");
  // const fileInput2 = document.querySelector("#bannerprofile");
  // const fileInput3 = document.querySelector("#doctorpageprofile");
  let formtype = $("#formtype").attr("data-formtype");

  if (fileInput.files[0] == undefined && formtype != "edit") {
    alert("please upload pic");
    return;
  }
  // }else if($('#bannerprofile').is(':visible')){
  //   if(fileInput2.files[0] == undefined || fileInput3.files[0] == undefined){
  //     alert('please upload pic')
  //     return
  //   }

  // }
  let doctorid = $("#formtype").attr("data-doctorid");
  let Doctor_Details;
  if (formtype == "edit" && fileInput?.files[0] == undefined) {
    Doctor_Details = {
      firstName: doc_name.value,
      lastName: doc_lname.value,
      dob: doc_date.value,
      gender: doc_gender.value,
      address: doc_address.value,
      state: doc_state.value,
      country: doc_country.value,
      pincode: doc_pincode.value,
      doctorEmail: doc_email.value,
      doctorMobile: doc_number.value,
      education: education_arr,
      experience: experience_arr,
      service: servicearr,
      placeid: placeid?.value == undefined ? 0 : placeid.value,
      formtype,
      doctorid,
      role: placeid?.value == undefined ? 1 : 0,
      doctorabout: doc_about,
      designation: doc_designation,
      department: doc_department,
      extrainfo,
      doctorbanner,
      doc_profile,
      urlname,
    };
  }
  if (fileInput.files[0] != undefined) {
    var formdata = new FormData();
    formdata.append("myfile", fileInput.files[0]);
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://admin.drvasuortho.com/submitvideo", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        imgsrc = result;
        // var formdata = new FormData();
        // if(placeid?.value == undefined){
        //   formdata.append("myfile", fileInput.files[0]);

        // }else{
        //   formdata.append("myfile", fileInput2.files[0]);

        // }
        //       let requestOptions = {
        //         method: "POST",
        //         body: formdata,
        //         redirect: "follow",
        //       };
        //     fetch("https://admin.drvasuortho.com/submitvideo", requestOptions)
        //     .then((response) => response.text())
        //     .then((result) => {
        //       console.log(result)
        //       doctorbanner = result
        // var formdata = new FormData();
        // if(placeid?.value == undefined){
        //   formdata.append("myfile", fileInput.files[0]);

        // }else{
        //       formdata.append("myfile", fileInput3.files[0]);
        // }
        //       let requestOptions = {
        //         method: "POST",
        //         body: formdata,
        //         redirect: "follow",
        //       };
        //         fetch("https://admin.drvasuortho.com/submitvideo", requestOptions)
        //         .then((response) => response.text())
        //         .then((result) => {
        // console.log(result)
        // doc_profile = result

        if (formtype == "edit") {
          Doctor_Details = {
            imgsrc,
            firstName: doc_name.value,
            lastName: doc_lname.value,
            dob: doc_date.value,
            gender: doc_gender.value,
            address: doc_address.value,
            state: doc_state.value,
            country: doc_country.value,
            pincode: doc_pincode.value,
            doctorEmail: doc_email.value,
            doctorMobile: doc_number.value,
            education: education_arr,
            experience: experience_arr,
            service: servicearr,
            placeid: placeid?.value == undefined ? 0 : placeid.value,
            formtype,
            doctorid,
            role: placeid?.value == undefined ? 1 : 0,
            doctorabout: doc_about,
            doctorbanner,
            doc_profile,
            designation: doc_designation,
            department: doc_department,
            extrainfo,
            urlname,
          };
        } else {
          Doctor_Details = {
            imgsrc,
            firstName: doc_name.value,
            lastName: doc_lname.value,
            dob: doc_date.value,
            gender: doc_gender.value,
            address: doc_address.value,
            state: doc_state.value,
            country: doc_country.value,
            pincode: doc_pincode.value,
            doctorEmail: doc_email.value,
            doctorMobile: doc_number.value,
            education: education_arr,
            experience: experience_arr,
            service: servicearr,
            password: "123456",
            placeid: placeid?.value == undefined ? 0 : placeid.value,
            formtype,
            role: placeid?.value == undefined ? 1 : 0,
            doctorabout: doc_about,
            doctorbanner,
            doc_profile,
            designation: doc_designation,
            department: doc_department,
            extrainfo,
            urlname,
          };
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(Doctor_Details);
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("https://admin.drvasuortho.com/doctorform", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            location.replace("/alldoctors");
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
    // })
    //   .catch((error) => console.log("error", error));
    // })
    //   .catch((error) => console.log("error", error));
  } else {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(Doctor_Details);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://admin.drvasuortho.com/doctorform", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        location.replace("/alldoctors");
      })
      .catch((error) => console.log("error", error));
  }
}
//   uploadprofile image
let loadFile = function (event) {
  // var image = event.target
  let image = document.getElementById("pic_img1");
  image.src = URL.createObjectURL(event.target.files[0]);
};
// let bannerloadFile = function (event) {
//   // var image = event.target
//   let image = document.getElementById('pic_img2');
//   image.src = URL.createObjectURL(event.target.files[0]);
// };

// let doctorloadFile = function (event) {
//   // var image = event.target
//   let image = document.getElementById('pic_img3');
//   image.src = URL.createObjectURL(event.target.files[0]);
// };
// password visible
$(".eye-icon").click(function () {
  var passInput = $(".password");
  if (passInput.attr("type") === "password") {
    passInput.attr("type", "text");
  } else {
    passInput.attr("type", "password");
  }
});
$(".eye-icon1").click(function () {
  var passInput = $(".conf_password");
  if (passInput.attr("type") === "password") {
    passInput.attr("type", "text");
  } else {
    passInput.attr("type", "password");
  }
});

var path = window.location.href;
$(".active_link").each(function () {
  console.log(this);
  if (this.href === path) {
    $(this).addClass("active1");
    $(".nav_side")
      .find(".active1")
      .find(".cls-2")
      .css("fill", "var(--highlight)");
  }
});
