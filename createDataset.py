import pandas as pd
import numpy as np
import os
import re
from datetime import datetime

import json



with open('conversationData.json') as json_file:

    # first parse the json file
    data = json.load(json_file)

    # get the list of keys
    type(list(data.keys()))
    keys = list(data.keys())
    for key in keys:

       " ".join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)","",key).split())
    print(keys)



    # get a list of values

    type(list(data.values()))
    values = list(data.values())

    combinedDictionary = {}


    np.save('conversationDictionary.npy', combinedDictionary)

    conversationFile = open('conversationData.json', 'w')
    for key,value in combinedDictionary.items():
        if (not key.strip() or not value.strip()):
        		# If there are empty strings
        	continue
        conversationFile.write(key.strip() + value.strip())
