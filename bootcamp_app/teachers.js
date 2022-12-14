const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
where cohorts.name = $1
ORDER BY teacher;
`
const cohort_name = process.argv[2] || 'JUL02';
const values = [`${cohort_name}`];

pool.query(queryString, values)
.then(res => {
    res.rows.forEach(user => {
      console.log(`${user.cohort}: ${user.teacher}`);
    });
})
.catch(err => console.error('query error', err.stack));