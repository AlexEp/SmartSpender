SELECT RD.*
FROM dbo.RAW_DATA RD
JOIN dbo.Business B ON RD.Description = B.Description
JOIN dbo.BusinessCategory BC ON B.BusinessID = BC.BusinessID
JOIN dbo.Category C ON BC.CategoryID = C.CategoryID
WHERE C.CategoryID = 1;


-- Food by month/ years
SELECT 
    YEAR(RD.IssueDate) AS Year,
    MONTH(RD.IssueDate) AS Month,
    COUNT(RD.DataID) AS TotalEntries,
    SUM(RD.Price) AS TotalPrice
FROM dbo.RAW_DATA RD
JOIN dbo.Business B ON RD.Description = B.Description
JOIN dbo.BusinessCategory BC ON B.BusinessID = BC.BusinessID
JOIN dbo.Category C ON BC.CategoryID = C.CategoryID
WHERE C.CategoryID = 1
AND B.BusinessID IN (
    SELECT BC.BusinessID
    FROM dbo.BusinessCategory BC
    JOIN dbo.Category C ON BC.CategoryID = C.CategoryID
    GROUP BY BC.BusinessID
    HAVING COUNT(DISTINCT BC.CategoryID) = 1
)
GROUP BY YEAR(RD.IssueDate), MONTH(RD.IssueDate)
ORDER BY Year DESC, Month DESC;



-- Food of specific year
SELECT 
    YEAR(RD.IssueDate) AS Year,
    MONTH(RD.IssueDate) AS Month,
    RD.*
FROM dbo.RAW_DATA RD
JOIN dbo.Business B ON RD.Description = B.Description
JOIN dbo.BusinessCategory BC ON B.BusinessID = BC.BusinessID
JOIN dbo.Category C ON BC.CategoryID = C.CategoryID
WHERE C.CategoryID = 1
AND B.BusinessID IN (
    SELECT BC.BusinessID
    FROM dbo.BusinessCategory BC
    JOIN dbo.Category C ON BC.CategoryID = C.CategoryID
    GROUP BY BC.BusinessID
    HAVING COUNT(DISTINCT BC.CategoryID) = 1
)
AND  YEAR(RD.IssueDate) =2025 AND MONTH(RD.IssueDate) =2
ORDER BY RD.IssueDate DESC


-- All Categories
SELECT 
    C.CategoryName,
    YEAR(RD.IssueDate) AS Year,
    MONTH(RD.IssueDate) AS Month,
    COUNT(RD.DataID) AS TotalEntries,
    SUM(RD.Price) AS TotalPrice
FROM dbo.RAW_DATA RD
JOIN dbo.Business B ON RD.Description = B.Description
JOIN dbo.BusinessCategory BC ON B.BusinessID = BC.BusinessID
JOIN dbo.Category C ON BC.CategoryID = C.CategoryID
GROUP BY C.CategoryName, YEAR(RD.IssueDate), MONTH(RD.IssueDate)
ORDER BY  C.CategoryName,Year DESC, Month DESC;




-- Business without category
SELECT B.*
FROM dbo.Business B
LEFT JOIN dbo.BusinessCategory BC ON B.BusinessID = BC.BusinessID
WHERE BC.BusinessID IS NULL;