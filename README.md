# GPERI-Result-Scrapper
## Google Chrome Extension

GPERI Result Scrapper is gujarat technological university result scapper.  
Scrap the result data and convert into JSON formate and send to server and store into database.  
GPERI Sresult Scapper is Google Chrome Extension that automatically increment and write enrollment number in textbox.  
Automatically write captcha code using optical character recognition and write in textbox.  
Submit the data autometically in 5 secounds.  

![Alt text](https://github.com/deeppatel234/GPERI-Result-Scrapper/blob/master/Screenshot/GTU%20Website.png)

## JSON Formate of Result Data 
```  
{  
  CGPA : "8.00",  
  CPI : "7.00",  
  Current Sem. Backlog : "0",  
  SPI : "9.00",  
  Total Backlog : "0",  
  branch : "COMPUTER ENGINEERING" ,  
  enroll : "11111111111",  
  examnumber : "1111111",  
  name : "DEMO",  
  sem : "BE SEM 7 - Regular (DEC 2016)",  

  // Subject Code //  
  1111111 : {  
    0 : "Subject Name",  
    1 : "CC",  
    2 : "BB",  
    3 : "BC",  
    4 : "AA",  
    5 : "AA",  
    6 : "AA",  
    7 : "BB"  
  }  
}  
```  

## How to Use

Install into google chrome browser and open gtu result website and write enrollment number only single time and scapper will autometically scrap data and send it to server
