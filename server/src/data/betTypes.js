const betTypes = {
    "color": {
        "red": ["1","3","5","7","9","12","14","16","18","19","21","23","25","27","30","32","34","36"],
        "black": ["2","4","6","8","10","11","13","15","17","20","22","24","26","28","29","31","33","35"]
    },
    "number": ["00", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18",
               "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36"],
    "oddEven": {
        "odd": ["1", "3", "5", "7", "9", "11", "13", "15", "17", "19", "21", "23", "25", "27", "29", "31", "33", "35"],
        "even": ["2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24", "26", "28", "30", "32", "34", "36"]
    },
    "highLow": {
        "high": ["19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36"],
        "low": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"]
    },
    "fiveNumber": { "0-00-1-2-3": ["0", "00", "1", "2", "3"] },
    "split": {  "0,00": ["0", "00"],
                "1,2": ["1", "2"],
                "1,4": ["1", "4"],
                "2,3": ["2", "3"],
                "2,5": ["2", "5"],  
                "3,6": ["3", "6"],
                "4,5": ["4", "5"],
                "4,7": ["4", "7"],
                "5,8": ["5", "8"],
                "5,6": ["5", "6"],
                "6,9": ["6", "9"],
                "7,8": ["7", "8"],
                "7,10": ["7", "10"],
                "8,11": ["8", "11"],
                "8,9": ["8", "9"],
                "9,12": ["9", "12"],
                "10,11": ["10", "11"],
                "10,13": ["10", "13"],
                "11,14": ["11", "14"],
                "11,12": ["11", "12"],
                "12,15": ["12", "15"],
                "13,14": ["13", "14"],
                "13,16": ["13", "16"],
                "14,17": ["14", "17"],
                "14,15": ["14", "15"],
                "15,18": ["15", "18"],
                "16,17": ["16", "17"],
                "17,20": ["17", "20"],
                "17,18": ["17", "18"],
                "18,21": ["18", "21"],
                "19,20": ["19", "20"],
                "20,21": ["20", "21"],
                "22,23": ["22", "23"],
                "22,25": ["22", "25"],
                "23,24": ["23", "24"],
                "23,26": ["23", "26"],
                "24,27": ["24", "27"],
                "25,26": ["25", "26"],
                "26,27": ["26", "27"],
                "28,29": ["28", "29"],
                "28,31": ["28", "31"],
                "29,30": ["29", "30"],
                "29,32": ["29", "32"],
                "30,33": ["30", "33"],
                "31,32": ["31", "32"],
                "32,33": ["32", "33"],
                "34,35": ["34", "35"],
                "34,36": ["34", "36"],
                "35,36": ["35", "36"] 
             },
    "street": { "1,2,3": ["1", "2", "3"], 
                "4,5,6": ["4", "5", "6"], 
                "7,8,9": ["7", "8", "9"],
                "10,11,12": ["10", "11", "12"],
                "13,14,15": ["13", "14", "15"],
                "16,17,18": ["16", "17", "18"],
                "19,20,21": ["19", "20", "21"],
                "22,23,24": ["22", "23", "24"],
                "25,26,27": ["25", "26", "27"],
                "28,29,30": ["28", "29", "30"],
                "31,32,33": ["31", "32", "33"],
                "34,35,36": ["34", "35", "36"]
              },
    "doubleStreet": { "1-6": ["1", "2", "3", "4", "5", "6"], 
                      "4-9": ["4", "5", "6", "7", "8", "9"], 
                      "7-12": ["7", "8", "9", "10", "11", "12"],
                      "10-15": ["10", "11", "12", "13", "14", "15"],
                      "13-18": ["13", "14", "15", "16", "17", "18"],
                      "16-21": ["16", "17", "18", "19", "20", "21"],
                      "19-24": ["19", "20", "21", "22", "23", "24"],
                      "22-27": ["22", "23", "24", "25", "26", "27"],
                      "25-30": ["25", "26", "27", "28", "29", "30"],
                      "28-33": ["28", "29", "30", "31", "32", "33"],
                      "31-36": ["31", "32", "33", "34", "35", "36"]
                    },
    "corner": { "1,2,4,5": ["1", "2", "4", "5"], 
                "2,3,5,6": ["2", "3", "5", "6"],
                "4,5,7,8": ["4", "5", "7", "8"],
                "5,6,8,9": ["5", "6", "8", "9"],
                "7,8,10,11": ["7", "8", "10", "11"],
                "8,9,11,12": ["8", "9", "11", "12"],
                "10,11,13,14": ["10", "11", "13", "14"],
                "11,12,14,15": ["11", "12", "14", "15"],   
                "13,14,16,17": ["13", "14", "16", "17"],
                "14,15,17,18": ["14", "15", "17", "18"],
                "16,17,19,20": ["16", "17", "19", "20"],
                "17,18,20,21": ["17", "18", "20", "21"],
                "19,20,22,23": ["19", "20", "22", "23"],
                "20,21,23,24": ["20", "21", "23", "24"],
                "22,23,25,26": ["22", "23", "25", "26"],
                "23,24,26,27": ["23", "24", "26", "27"],
                "25,26,28,29": ["25", "26", "28", "29"],
                "26,27,29,30": ["26", "27", "29", "30"],
                "28,29,31,32": ["28", "29", "31", "32"],
                "29,30,32,33": ["29", "30", "32", "33"],
                "31,32,34,35": ["31", "32", "34", "35"],
                "32,33,35,36": ["32", "33", "35", "36"]
              },
    "dozen": { "1-12": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                "13-24": ["13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
                "25-36": ["25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36"]
     },
    "column": { "1st": ["1", "4", "7", "10", "13", "16", "19", "22", "25", "28", "31", "34"],
                "2nd": ["2", "5", "8", "11", "14", "17", "20", "23", "26", "29", "32", "35"],
                "3rd": ["3", "6", "9", "12", "15", "18", "21", "24", "27", "30", "33", "36"]
     }
};

module.exports = betTypes;
