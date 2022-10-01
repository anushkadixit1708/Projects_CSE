# 911-Association-Rule-Mining

# Introduction
There is a shortage of Police Forces and Medical Resources. A higher number of resources are required in different regions at different times all around the year. Understanding the pattern of the various emergency situations can be a boon for better resource management and could also help to identify the root cause of multiple problems.
The high number of road accidents in a certain region could be because of poor road conditions which can be improved. A high number of respiratory problem-related calls could be due to an air pollutant in a region. Thus, association rule mining can help to identify such interesting rules which might not be obvious and could be missed by exploratory data analysis.
# Data Source
The dataset has been obtained from Harvard Dataverse. The dataset contains Emergency 911 calls in Montgomery County located in the Commonwealth of Pennsylvania.
The dataset contains 663522 call records and information like latitude, longitude, zip code, the reason for calling, description and timestamp.
# Tools Used
- Google Colab for running jupyter notebook
- Mlxtend library for association mining algorithms
- Numpy and pandas library for maths and dataframe operations
- Seaborn library for visualisation
- Geopandas library for maps
# Technique Used
- Exploratory data analysis(EDA)
- Apriori algorithm
- FP Growth algorithm
# Proposed System
 ![System Architecture](/Images/flowchart_square.png)
# Association Rule Mining
This is the main task and requires multiple steps:
- Preprocessing the data to be suitable for the algorithm, in our case, this required dropping multiple attributes and performing one-hot encoding.
- Finding the appropriate support and confidence. In our case, it was 0.01 as minimum support and 0.1 as confidence.
  ![Best Support and Confidence](/Images/Best.png)
- Applying the Apriori algorithm and FP Growth algorithm. In comparison, FP Growth was found to be faster, as expected.
# Some Interesting Results found
##### {December} => {Traffic: VEHICLE ACCIDENT}
 This implies that a lot of accidents happen in Pennsylvania during winter which can be partially because of heavy snowfall and formation of ice crust on roads causing vehicles to skid.
##### {EMS: ASSAULT VICTIM,Night} => {NORRISTOWN}
 This implies that mainy assaults occur during night in Norristown which is infamous for the scourge of drugs.
##### {EMS: CVA/STROKE} => {Morning}
Rule indicates that stroke is likely to occur in the morning.
Scientific research says that you are more likely to suffer a stroke in the early morning than any other time, and this increased risk is linked to the body’s natural rhythms.

Many more interesting results were found.
