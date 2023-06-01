import StudentsPicker from '../components/StudentsPicker';
import StudentsTable from '../components/StudentsTable';
import { fetchStudentData, fetchSchoolData, fetchLegalguardianData } from '../utils';
import { useState } from 'react';


const studentsDataComponent = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [schoolsData, setSchoolsData] = useState([]);
  const [legalguardiansData, setLegalguardiansData] = useState([]);


  const onStudentsPick = useCallback(async () => {
   // Create a cachedData object to store fetched data
  const cachedData = {
    studentsData: [],
    schoolsData: [],
    legalguardiansData: [],
  };


   // Function to fetch and cache student, school, and legal guardian data
  const fetchAndCacheData = async (studentId) => {
   // Check if student data is already cached, fetch if not
    const studentData = cachedData.studentsData[studentId]
      ? cachedData.studentsData[studentId]
      : await fetchStudentData(studentId);


   // Cache the fetched student data
    cachedData.studentsData[studentId] = studentData;


   // Fetch school and legal guardian data for each student
    for (const student of studentData) {
      const { schoolId, legalguardianId } = student;


     // Check if school data is already cached, fetch if not      
const schoolData =
        cachedData.schoolsData[schoolId] || (await fetchSchoolData(schoolId));


     // Cache the fetched school data
      cachedData.schoolsData[schoolId] = schoolData;


     // Check if legal guardian data is already cached, fetch if not
      const legalguardianData =
        cachedData.legalguardiansData[legalguardianId] ||
        (await fetchLegalguardianData(legalguardianId));


     // Cache the fetched legal guardian data
      cachedData.legalguardiansData[legalguardianId] = legalguardianData;
    }
  };


 // Fetch data for all studentIds concurrently
  await Promise.all(studentIds.map(fetchAndCacheData));


 // Update state with the cached data
  setStudentsData(cachedData.studentsData);
  setSchoolsData(cachedData.schoolsData);
  setLegalguardiansData(cachedData.legalguardiansData);
}, [
  studentIds
]);


  return (
    <>
      <StudentsPicker onPickHandler={onStudentsPick} />
      <StudentsTable
        studentsData={studentsData}
        schoolsData={schoolsData}
        LegalguardiansData={legalguardiansData}
      />
    </>
  );
};


export default studentsDataComponent;