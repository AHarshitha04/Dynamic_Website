import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/UploadPage.css";

const UploadPage = () => {
  // const[showselectexamsection,Setshowselectexamsection]=useState(true)
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([""]);
  const [sections, setSections] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedSection, setSelectedSection] = useState("");

  const [enableExamsMenu, setEnableExamsMenu] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5001/courses")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const fetchExamsAndSections = (courseId) => {
    axios
      .get(`http://localhost:5001/sections/${courseId}`)
      .then((res) => {
        setSections(res.data);
        console.log(sections);
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });
  };

  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    setSelectedCourse(courseId);
    setSelectedSection(null);
    setSelectedExam(null);
    setEnableExamsMenu(false);
    fetchExamsAndSections(courseId);
    console.log("Selected Course:", courseId);
  };
  const [show1, setShow1] = useState(null);
  const handleSectionChange = (event) => {
    const sectionId = event.target.value;
    setSelectedSection(sectionId);

    // Enable the "Exams" menu only for specific section values
    const isFirstSection = sectionId === "1";
    const isSecondSection = sectionId === "2";
    const isThirdSection = sectionId === "3";
    const isFourthSection = sectionId === "4";
    const isFiveSection = sectionId === "5";
    const isSixthSection = sectionId === "6";

    // Enable/disable exams menu based on the condition

    setEnableExamsMenu(isThirdSection || isSixthSection);

    if (isThirdSection || isSixthSection) {
      setShow1(true);
    } else {
      setShow1(false);
    }

    if (isFirstSection || isSecondSection || isFourthSection || isFiveSection) {
      const fetchExamsAndSections = (courseId) => {
        axios
          .get(`http://localhost:5001/sections/${courseId}`)
          .then((res) => {
            setSections(res.data);
            console.log("Selected section:", sectionId);
            // console.log(sections);
          })
          .catch((error) => {
            console.error("Error fetching sections:", error);
          });
        axios
          .get(`http://localhost:5001/quiz_exams/${courseId}`)
          .then((res) => {
            // setExams(res.data);
            console.log(exams);
          })
          .catch((error) => {
            console.error("Error fetching exams:", error);
          });
        fetchExamsAndSections(selectedCourse);
      };
    } else if (isThirdSection || isSixthSection) {
      // Fetch exams based on the selected course and section

      const fetchExamsAndSections = (courseId) => {
        axios
          .get(`http://localhost:5001/sections/${courseId}`)
          .then((res) => {
            setSections(res.data);
            console.log(sections);
          })
          .catch((error) => {
            console.error("Error fetching sections:", error);
          });

        axios
          .get(`http://localhost:5001/quiz_exams/${courseId}`)
          .then((res) => {
            setExams(res.data);

            console.log(exams);
          })
          .catch((error) => {
            console.error("Error fetching exams:", error);
          });
      };
      fetchExamsAndSections(selectedCourse);
      setExams([]);
      setSections([]);
    }

    if (
      setExams == isFirstSection ||
      isSecondSection ||
      isFourthSection ||
      isFiveSection
    ) {
      setSelectedExam(!exams);

      const fetchExamsAndSections = (courseId) => {
        axios
          .get(`http://localhost:5001/sections/${courseId}`)
          .then((res) => {
            setSections(res.data);
            console.log(sections);
          })
          .catch((error) => {
            console.error("Error fetching sections:", error);
          });

        axios
          .get(`http://localhost:5001/quiz_exams/${courseId}`)
          .then((res) => {
            // setExams(res.data);

            console.log(exams);
          })
          .catch((error) => {
            console.error("Error fetching exams:", error);
          });
      };
      fetchExamsAndSections(selectedCourse);
      setExams([]);
      setSections([]);
      // Setshowselectexamsection(false)
      console.log("working");
    } else if (
      setExams == isSecondSection ||
      isFirstSection ||
      isFourthSection ||
      isFiveSection
    ) {
      setSelectedExam(!exams);

      const fetchExamsAndSections = (courseId) => {
        axios
          .get(`http://localhost:5001/sections/${courseId}`)
          .then((res) => {
            setSections(res.data);
            console.log(sections);
          })
          .catch((error) => {
            console.error("Error fetching sections:", error);
          });
        axios
          .get(`http://localhost:5001/quiz_exams/${courseId}`)
          .then((res) => {
            // setExams(res.data);

            console.log(exams);
          })
          .catch((error) => {
            console.error("Error fetching exams:", error);
          });
      };
      fetchExamsAndSections(selectedCourse);
      setExams([]);
      setSections([]);
      // console.log("working")
    }
  };

  const handleExamChange = (event) => {
    const examId = event.target.value;
    setSelectedExam(examId);
  };

  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpload = async () => {
    if (!selectedCourse || !selectedSection || !image) {
      console.error(
        "Please select course, section, and choose an image before uploading."
      );
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("course_id", selectedCourse);
    formData.append("section_id", selectedSection);

    try {
      // Include exam_id in the formData if selectedSection is "3" or "6"
      if (["3", "6"].includes(selectedSection)) {
        if (!selectedExam) {
          console.error("Please select an exam for Course Exam Page.");
          return;
        }
        formData.append("exam_id", selectedExam);
      }

      // Use a single route for both main page and course exam uploads
      const response = await axios.post(
        "http://localhost:5001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // "Authorization": "Bearer YOUR_ACCESS_TOKEN",
          },
        }
      );

      console.log(response.data);
      setUploadStatus("success");
      // Update UI or perform other actions on successful upload
    } catch (error) {
      console.error("Error uploading image", error);
      setUploadStatus("error");
      // Handle error, show a message, etc.
    }
  };

  return (
    <div className="home">
      <div>
        <h3>Upload Images</h3>
      </div>

      <div>
        <label htmlFor="Course">Course: </label>
        <select
          id="CourseChange"
          onChange={handleCourseChange}
          value={selectedCourse}
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.course_id} value={course.course_id}>
              {course.course_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="Section">Section: </label>
        <select
          id="SectionChange"
          onChange={handleSectionChange}
          value={selectedSection}
        >
          <option value="">Select Section</option>
          {sections.map((section) => (
            <option key={section.section_id} value={section.section_id}>
              {section.section_name}
            </option>
          ))}
        </select>
        {show1 ? (
          <div>
            <label htmlFor="state">Exam: </label>
            <select id="state" onChange={handleExamChange} value={selectedExam}>
              <option value="">Select Exam</option>
              {exams.map((exam) => (
                <option key={exam.exam_id} value={exam.exam_id}>
                  {exam.exam_name}
                </option>
              ))}
            </select>
            <br />
          </div>
        ) : null}

        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload Image</button>
      </div>
      
      <div>
        {uploadStatus === "success" && (
          <p style={{ color: "green" }}>Successfully uploaded!</p>
        )}
        {uploadStatus === "error" && (
          <p style={{ color: "red" }}>
            Error uploading image. Please try again.
          </p>
        )}
      </div>
      <br />
      <br />
      <Link className="FilesListLink" to={"/ImageFetching"}>
        Show Uploaded Files
      </Link>
    </div>
  );
};

export default UploadPage;
