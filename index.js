document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById("studentForm");
    const studentTable = document.getElementById("studentTable").querySelector("tbody");
    
    let students = JSON.parse(localStorage.getItem("students")) || [];
      //save data in local storage after pardhing
    function save() {
        localStorage.setItem("students", JSON.stringify(students));
    }
   
    function renderStudents() {
        studentTable.innerHTML = "";
        students.forEach((student, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.studentId}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>${student.className}</td>
                <td>${student.address}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            studentTable.appendChild(row);
        });

     //checking length to apply scroll bar
        if (students.length > 5) {
            studentTable.parentElement.classList.add("scrollable");
        } else {
            studentTable.parentElement.classList.remove("scrollable");
        }
    }

    studentForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const studentId = document.getElementById("studentId").value.trim();
        const email = document.getElementById("email").value.trim();
        const contact = document.getElementById("contact").value.trim();
        const className = document.getElementById("class").value.trim();
        const address = document.getElementById("address").value.trim();

        if (!name || !studentId || !email || !contact || !className || !address) {
            alert("All fields are required!");
            return;
        }
       // using regular expressions to validate all fields 
        if (!/^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(name)) {
            alert("Name should contain only letters and single spaces between words.");
            return;
        }
        
        if (!/^\d{5,10}$/.test(studentId)) {
            alert("Student ID must be between 5 to 10 digits.");
            return;
        }
        
        if (!/^\d{10}$/.test(contact)) {
            alert("Contact number must be exactly 10 digits.");
            return;
        }
        
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            alert("Enter a valid email address.");
            return;
        }
        

        students.push({ name, studentId, email, contact, className, address });
        save(); //add to local storage function called
        renderStudents(); // display items in local store function called
        studentForm.reset(); // form will be empty
    });
 
    //fun definition of edit student
    window.editStudent = (index) => {
        const student = students[index];

        document.getElementById("name").value = student.name;
        document.getElementById("studentId").value = student.studentId;
        document.getElementById("email").value = student.email;
        document.getElementById("contact").value = student.contact;
        document.getElementById("class").value = student.className;
        document.getElementById("address").value = student.address;

        students.splice(index, 1);
        save(); // save after edit
        renderStudents(); // display after edit
    };
    //function definition of delete student 
    window.deleteStudent = (index) => {
        if (confirm("Are you sure you want to delete this record?")) {
            students.splice(index, 1);
            save(); //save after delete
            renderStudents();  //display after deletion
        }
    };

    renderStudents();  //displaying student details when page loads 
});




