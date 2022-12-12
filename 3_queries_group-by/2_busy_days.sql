SELECT day, COUNT(assignments.*) AS total_assignments
FROM assignments
GROUP BY day
HAVING COUNT(assignments.*) >= 10
ORDER BY day;