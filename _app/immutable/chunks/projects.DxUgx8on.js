import{A as t}from"./assets.CeBfep0b.js";import{a as n}from"./skills.DxDhomuH.js";const e=`# Portfolio Style Analysis

### Introduction
Style Analysis was introduced by Nobel Laureate William Sharpe as a tool to systematically measure the exposures of managed portfolio.

The main idea was to regress fund returns on indexes representing a range of asset classes (T-bill, Small/Medium/Large Cap, Low P/E (Value Stock), High P/E (Growth Stock) etc.). The regression coefficient on each index would then measure the fund's implicit allocation to that "style"

As funds are barred from short positions, the regression coefficients will be non-negative and add up to 100% to represent a complete asset allocation.

### Intepretation
The **R-square** of the regression measures the percentage of return variability attributable to the style choice rather than security selection.

The **intercept** measures the average return from security selection of the fund portfolio. In other words, it tracks the average success of security selection over the sample period.

### Implementation
In this project, we will be using the following python libraries to do the Returns-Based Style Anlaysis:
- [**yfinance**](https://aroussi.com/post/python-yahoo-finance) : Open-source tool to fetch financial and market data from [Yahoo Finance](https://finance.yahoo.com/).
- [**pandas**](https://pandas.pydata.org/) : Popular data analysis and manipulation tool
- [**matplotlib**](https://matplotlib.org/) and [**seaborn**](https://seaborn.pydata.org/): Creating attractive visualization of the style analysis
- [**scipy**](https://scipy.org/) : Sciencific computing and optimization algorithm

### Reference:
- William F. Sharpe, “Asset Allocation: Management Style and Performance Evaluation" Journal of Portfolio Management, Winter 1992, pp. 7-19.
- Gary Brinson, Brian Singer, and Gilbert Beebower, “Determinants of Portfolio Performance,” Financial Analysts Journal, May/June 1991.
- Bodie, Zvi, Alex Kane and Alan Marcus, 2021, Investments (12th Edition), McGraw Hill, ISBN 978-1-260-
59024-1

### Installation

We will first install the libraries needed for the style analysis.


\`\`\`python
!pip install yfinance
import yfinance as yf

from datetime import date
from IPython.display import display, HTML

import pandas as pd
from scipy.optimize import minimize
import matplotlib.pyplot as plt
import matplotlib.ticker as mtick
import seaborn as sns
\`\`\`

    Collecting yfinance
      Downloading yfinance-0.2.51-py2.py3-none-any.whl.metadata (5.5 kB)
    Requirement already satisfied: pandas>=1.3.0 in /home/haoyi/.local/lib/python3.12/site-packages (from yfinance) (2.2.3)
    Requirement already satisfied: numpy>=1.16.5 in /home/haoyi/.local/lib/python3.12/site-packages (from yfinance) (2.1.2)
    Requirement already satisfied: requests>=2.31 in /home/haoyi/miniconda3/lib/python3.12/site-packages (from yfinance) (2.32.3)
    Collecting multitasking>=0.0.7 (from yfinance)
      Downloading multitasking-0.0.11-py3-none-any.whl.metadata (5.5 kB)
    Collecting lxml>=4.9.1 (from yfinance)
      Downloading lxml-5.3.0-cp312-cp312-manylinux_2_28_x86_64.whl.metadata (3.8 kB)
    Requirement already satisfied: platformdirs>=2.0.0 in /home/haoyi/.local/lib/python3.12/site-packages (from yfinance) (4.3.6)
    Requirement already satisfied: pytz>=2022.5 in /home/haoyi/miniconda3/lib/python3.12/site-packages (from yfinance) (2024.2)
    Requirement already satisfied: frozendict>=2.3.4 in /home/haoyi/miniconda3/lib/python3.12/site-packages (from yfinance) (2.4.2)
    Collecting peewee>=3.16.2 (from yfinance)
      Downloading peewee-3.17.8.tar.gz (948 kB)
    \x1B[2K     \x1B[90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1B[0m \x1B[32m948.2/948.2 kB\x1B[0m \x1B[31m17.5 MB/s\x1B[0m eta \x1B[36m0:00:00\x1B[0m
    \x1B[?25h  Installing build dependencies ... \x1B[?25ldone
    \x1B[?25h  Getting requirements to build wheel ... \x1B[?25ldone
    \x1B[?25h  Preparing metadata (pyproject.toml) ... \x1B[?25ldone
    \x1B[?25hRequirement already satisfied: beautifulsoup4>=4.11.1 in /home/haoyi/.local/lib/python3.12/site-packages (from yfinance) (4.12.3)
    Collecting html5lib>=1.1 (from yfinance)
      Downloading html5lib-1.1-py2.py3-none-any.whl.metadata (16 kB)
    Requirement already satisfied: soupsieve>1.2 in /home/haoyi/.local/lib/python3.12/site-packages (from beautifulsoup4>=4.11.1->yfinance) (2.6)
    Requirement already satisfied: six>=1.9 in /home/haoyi/miniconda3/lib/python3.12/site-packages (from html5lib>=1.1->yfinance) (1.16.0)
    Requirement already satisfied: webencodings in /home/haoyi/.local/lib/python3.12/site-packages (from html5lib>=1.1->yfinance) (0.5.1)
    Requirement already satisfied: python-dateutil>=2.8.2 in /home/haoyi/miniconda3/lib/python3.12/site-packages (from pandas>=1.3.0->yfinance) (2.9.0.post0)
    Requirement already satisfied: tzdata>=2022.7 in /home/haoyi/.local/lib/python3.12/site-packages (from pandas>=1.3.0->yfinance) (2024.2)
    Requirement already satisfied: charset-normalizer<4,>=2 in /home/haoyi/miniconda3/lib/python3.12/site-packages (from requests>=2.31->yfinance) (3.3.2)
    Requirement already satisfied: idna<4,>=2.5 in /home/haoyi/miniconda3/lib/python3.12/site-packages (from requests>=2.31->yfinance) (3.7)
    Requirement already satisfied: urllib3<3,>=1.21.1 in /home/haoyi/miniconda3/lib/python3.12/site-packages (from requests>=2.31->yfinance) (2.2.3)
    Requirement already satisfied: certifi>=2017.4.17 in /home/haoyi/miniconda3/lib/python3.12/site-packages (from requests>=2.31->yfinance) (2024.8.30)
    Downloading yfinance-0.2.51-py2.py3-none-any.whl (104 kB)
    Downloading html5lib-1.1-py2.py3-none-any.whl (112 kB)
    Downloading lxml-5.3.0-cp312-cp312-manylinux_2_28_x86_64.whl (4.9 MB)
    \x1B[2K   \x1B[90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1B[0m \x1B[32m4.9/4.9 MB\x1B[0m \x1B[31m39.7 MB/s\x1B[0m eta \x1B[36m0:00:00\x1B[0m
    \x1B[?25hDownloading multitasking-0.0.11-py3-none-any.whl (8.5 kB)
    Building wheels for collected packages: peewee
      Building wheel for peewee (pyproject.toml) ... \x1B[?25ldone
    \x1B[?25h  Created wheel for peewee: filename=peewee-3.17.8-cp312-cp312-linux_x86_64.whl size=300347 sha256=4a71e46c4daac19bf938cc990378a2034eba36ca7916dffdf4fda20585c30302
      Stored in directory: /home/haoyi/.cache/pip/wheels/8f/65/34/456800445efeafb05164fe95285c70e81ba1d96bae30f43917
    Successfully built peewee
    Installing collected packages: peewee, multitasking, lxml, html5lib, yfinance
    Successfully installed html5lib-1.1 lxml-5.3.0 multitasking-0.0.11 peewee-3.17.8 yfinance-0.2.51


### Project Parameters

The parameters of the style analysis are defined as shown:
- \`start_date\` : Starting period of the style anlaysis
- \`end_date\` : Ending period of the style analysis
- \`date_interval\` : Interval between data points
- \`fund_tick\` : Ticker of the fund to perform return-based style analysis on
- \`reference_funds\` : Tickers of the [stock market indices](https://finance.yahoo.com/markets/world-indices/) to measure the fund's implicit style allocation
- \`style_analysis_start_date\`: Starting period of the style analysis
- \`window_size\` : Size of the rolling window period (in months)



\`\`\`python
start_date = '2019-05-01'
end_date = '2024-06-01'
date_interval = '1mo'

fund_tick = 'VYM' # Vanguard High Dividend Yield Index Fund

reference_funds = [
    # '^RLG', # Russ 1000 Growth
    # '^RLV', # Russ 1000 value
    # '^RUJ', # Russ 2000 value
    # '^RUO', # Russ 2000 Growth
    '^RUT', # Russell 2000
    '^DJI', # Dow Jones
    '^GSPC', # S&P 500
    '^IXIC', # NASDAQ
    '^FTSE', # FTSE 100
]
n_funds = len(reference_funds)

style_analysis_start_date = '202205'
window_size = 36 # 3 years window
\`\`\`

### Risk Free Return

The market risk free rate is an important variable when doing any financial analysis.

We will be retrieving the monthly risk free rate from the [Fama-French Model Data library](https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/data_library.html) by the Tuck School of Business, Dartmouth College.

We will be extracting the Risk-Free Rate From the *Fama/French 5 Factor (2 x 3)* CSV File


\`\`\`python
DATA_SOURCE="https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/ftp/F-F_Research_Data_5_Factors_2x3_CSV.zip"
########## MODIFY THIS ##########
file_name = DATA_SOURCE.split("/")[-1].split(".")[0]
!rm *.csv
!wget --no-check-certificate $DATA_SOURCE
!unzip -o *.zip*
!rm *.zip
!ls

READ_LIMIT = 5000
READ_TOKEN = 'RF'
starting_indices_len = {}
# get the index to start reading and the length of the data table
with open(file_name[:-4] + ".csv", "r") as file:
    in_table, index_len, title = False, [0,0], ''
    for index, line in enumerate(file):
      if index > READ_LIMIT: break # prevent reading too much of the file
      elif (not line.strip()): # ignore empty lines
        if (in_table):
          starting_indices_len[title] = [*index_len]
        in_table = False
        continue
      # Check for labels
      if (READ_TOKEN in line.replace(" ", "")):
        # print(line)
        title = line.strip()
        in_table = True
        index_len[0] = index
      if (in_table):  # track size of table the lazy way
        # print(line)
        index_len[1] += 1

print(*starting_indices_len.items(), sep="\\n")
\`\`\`

    rm: cannot remove '*.csv': No such file or directory
    --2025-01-08 16:27:34--  https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/ftp/F-F_Research_Data_5_Factors_2x3_CSV.zip
    Resolving mba.tuck.dartmouth.edu (mba.tuck.dartmouth.edu)... 129.170.136.60
    Connecting to mba.tuck.dartmouth.edu (mba.tuck.dartmouth.edu)|129.170.136.60|:443... connected.
    HTTP request sent, awaiting response... 200 OK
    Length: 11509 (11K) [application/x-zip-compressed]
    Saving to: ‘F-F_Research_Data_5_Factors_2x3_CSV.zip’
    
    F-F_Research_Data_5 100%[===================>]  11.24K  --.-KB/s    in 0s      
    
    2025-01-08 16:27:36 (111 MB/s) - ‘F-F_Research_Data_5_Factors_2x3_CSV.zip’ saved [11509/11509]
    
    Archive:  F-F_Research_Data_5_Factors_2x3_CSV.zip
      inflating: F-F_Research_Data_5_Factors_2x3.csv  
    F-F_Research_Data_5_Factors_2x3.csv  Portfolio_Style_Analysis.ipynb
    (',Mkt-RF,SMB,HML,RMW,CMA,RF', [3, 738])


### Factors in the Fama French Model

The Fama/French Model use firm characteristics that seem on empirical grounds as proxy for exposure to systemic risk

The factors chosen are variables based on historical evidence that seem to predict average returns and hence may be capturing risk premiums.

The factors in the model are as shown:
- Small Minus Big (SMB) : The return of small stock portfolios in excess of the return of large stock portfolios, indicative of Small Premium
- High Minus Low (HML) : The return of a Value stock portfolios (High Book-To-Market ratio) in excess of the return of Growth stock portfolios, indicative of Value Premium
- Robust Minus Weak (RMW) : The return of high operating profitbility portfolios in excess of the return of a weak operating profitability portfolios.
- Conservative Minus Aggressive (CMA) : The return of conversative investment portfolios in excess of aggressive investment portfolios.

Further descriptions are available at the [Fama-French Model Website](https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/Data_Library/f-f_5_factors_2x3.html)


\`\`\`python
table_to_use = ',Mkt-RF,SMB,HML,RMW,CMA,RF'
start_column = None # Example "SMB" # set to None (without inverted comma) if unused, else set to "<COLUMN NAME>"
end_column = None # Example "CMA" # set to None (without inverted comma) if unused, else set to "<COLUMN NAME>"

title = table_to_use.replace("-", "")
start_end_index = starting_indices_len[table_to_use]
data_tab = pd.read_csv(file_name[:-4] + ".csv",
                       skiprows=start_end_index[0] , nrows= start_end_index[1] -2)
data_tab.index = data_tab.iloc[:, 0]
data_tab.drop(columns=data_tab.columns[0], axis=1, inplace=True)

if start_column or end_column:
  start_column = start_column if start_column else data_tab.columns[0]
  end_column = end_column if end_column else data_tab.columns[-1]
  data_tab = data_tab.loc[:, start_column:end_column]

fama_french = data_tab.loc[date.fromisoformat(start_date).strftime('%Y%m') : date.fromisoformat(end_date).strftime('%Y%m')].iloc[1:-1].astype(float)
fama_french /= 100

display(fama_french.head(), fama_french.tail())
\`\`\`


<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Mkt-RF</th>
      <th>SMB</th>
      <th>HML</th>
      <th>RMW</th>
      <th>CMA</th>
      <th>RF</th>
    </tr>
    <tr>
      <th>Unnamed: 0</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>201906</th>
      <td>0.0693</td>
      <td>0.0037</td>
      <td>-0.0070</td>
      <td>0.0090</td>
      <td>-0.0044</td>
      <td>0.0018</td>
    </tr>
    <tr>
      <th>201907</th>
      <td>0.0119</td>
      <td>-0.0178</td>
      <td>0.0047</td>
      <td>-0.0007</td>
      <td>0.0034</td>
      <td>0.0019</td>
    </tr>
    <tr>
      <th>201908</th>
      <td>-0.0258</td>
      <td>-0.0324</td>
      <td>-0.0479</td>
      <td>0.0056</td>
      <td>-0.0068</td>
      <td>0.0016</td>
    </tr>
    <tr>
      <th>201909</th>
      <td>0.0143</td>
      <td>0.0026</td>
      <td>0.0677</td>
      <td>0.0184</td>
      <td>0.0339</td>
      <td>0.0018</td>
    </tr>
    <tr>
      <th>201910</th>
      <td>0.0206</td>
      <td>0.0027</td>
      <td>-0.0190</td>
      <td>0.0043</td>
      <td>-0.0095</td>
      <td>0.0016</td>
    </tr>
  </tbody>
</table>
</div>



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Mkt-RF</th>
      <th>SMB</th>
      <th>HML</th>
      <th>RMW</th>
      <th>CMA</th>
      <th>RF</th>
    </tr>
    <tr>
      <th>Unnamed: 0</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>202401</th>
      <td>0.0070</td>
      <td>-0.0568</td>
      <td>-0.0247</td>
      <td>0.0066</td>
      <td>-0.0102</td>
      <td>0.0047</td>
    </tr>
    <tr>
      <th>202402</th>
      <td>0.0507</td>
      <td>-0.0076</td>
      <td>-0.0352</td>
      <td>-0.0198</td>
      <td>-0.0216</td>
      <td>0.0042</td>
    </tr>
    <tr>
      <th>202403</th>
      <td>0.0283</td>
      <td>-0.0118</td>
      <td>0.0422</td>
      <td>0.0147</td>
      <td>0.0119</td>
      <td>0.0043</td>
    </tr>
    <tr>
      <th>202404</th>
      <td>-0.0467</td>
      <td>-0.0255</td>
      <td>-0.0052</td>
      <td>0.0148</td>
      <td>-0.0030</td>
      <td>0.0047</td>
    </tr>
    <tr>
      <th>202405</th>
      <td>0.0434</td>
      <td>0.0077</td>
      <td>-0.0167</td>
      <td>0.0297</td>
      <td>-0.0307</td>
      <td>0.0044</td>
    </tr>
  </tbody>
</table>
</div>


### Calculate monthly return of funds and portfolio




\`\`\`python
# Get the dates of the style analysis
dates = yf.download(fund_tick, start=start_date, end=end_date, interval=date_interval).index.tolist()[1:]
dates = [date_val.strftime('%Y%m') for date_val in dates]

def get_monthly_return(ticker):
  data = yf.download(ticker, start=start_date, end=end_date, interval=date_interval)
  monthly_return = data['Close'].pct_change().dropna()
  return monthly_return.tolist() if isinstance(monthly_return, pd.Series) else monthly_return.iloc[:, 0].tolist()

monthly_return_table = pd.DataFrame(index=dates)
monthly_return_table[fund_tick] = get_monthly_return(fund_tick)
monthly_return_table["risk_free"] = fama_french["RF"].tolist()

for ticker in reference_funds:
  monthly_return_table[ticker] = get_monthly_return(ticker)

display(monthly_return_table.head(), monthly_return_table.tail())
\`\`\`

    [*********************100%***********************]  1 of 1 completed

    
    [*********************100%***********************]  1 of 1 completed
    [*********************100%***********************]  1 of 1 completed
    [*********************100%***********************]  1 of 1 completed
    [*********************100%***********************]  1 of 1 completed
    [*********************100%***********************]  1 of 1 completed
    [*********************100%***********************]  1 of 1 completed



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>VYM</th>
      <th>risk_free</th>
      <th>^RUT</th>
      <th>^DJI</th>
      <th>^GSPC</th>
      <th>^IXIC</th>
      <th>^FTSE</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>201906</th>
      <td>0.058767</td>
      <td>0.0018</td>
      <td>0.068973</td>
      <td>0.071929</td>
      <td>0.068930</td>
      <td>0.074209</td>
      <td>0.036849</td>
    </tr>
    <tr>
      <th>201907</th>
      <td>0.014513</td>
      <td>0.0019</td>
      <td>0.005132</td>
      <td>0.009936</td>
      <td>0.013128</td>
      <td>0.021131</td>
      <td>0.021709</td>
    </tr>
    <tr>
      <th>201908</th>
      <td>-0.021020</td>
      <td>0.0016</td>
      <td>-0.050660</td>
      <td>-0.017160</td>
      <td>-0.018092</td>
      <td>-0.025997</td>
      <td>-0.050034</td>
    </tr>
    <tr>
      <th>201909</th>
      <td>0.029828</td>
      <td>0.0018</td>
      <td>0.019086</td>
      <td>0.019450</td>
      <td>0.017181</td>
      <td>0.004579</td>
      <td>0.027889</td>
    </tr>
    <tr>
      <th>201910</th>
      <td>0.019436</td>
      <td>0.0016</td>
      <td>0.025654</td>
      <td>0.004807</td>
      <td>0.020432</td>
      <td>0.036631</td>
      <td>-0.021571</td>
    </tr>
  </tbody>
</table>
</div>



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>VYM</th>
      <th>risk_free</th>
      <th>^RUT</th>
      <th>^DJI</th>
      <th>^GSPC</th>
      <th>^IXIC</th>
      <th>^FTSE</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>202401</th>
      <td>0.017582</td>
      <td>0.0047</td>
      <td>-0.039333</td>
      <td>0.012225</td>
      <td>0.015896</td>
      <td>0.010170</td>
      <td>-0.013267</td>
    </tr>
    <tr>
      <th>202402</th>
      <td>0.026229</td>
      <td>0.0042</td>
      <td>0.055204</td>
      <td>0.022178</td>
      <td>0.051721</td>
      <td>0.061192</td>
      <td>-0.000079</td>
    </tr>
    <tr>
      <th>202403</th>
      <td>0.048258</td>
      <td>0.0043</td>
      <td>0.033925</td>
      <td>0.020796</td>
      <td>0.031019</td>
      <td>0.017869</td>
      <td>0.042280</td>
    </tr>
    <tr>
      <th>202404</th>
      <td>-0.031962</td>
      <td>0.0047</td>
      <td>-0.070904</td>
      <td>-0.050027</td>
      <td>-0.041615</td>
      <td>-0.044058</td>
      <td>0.024080</td>
    </tr>
    <tr>
      <th>202405</th>
      <td>0.030308</td>
      <td>0.0044</td>
      <td>0.048746</td>
      <td>0.023017</td>
      <td>0.048021</td>
      <td>0.068796</td>
      <td>0.016122</td>
    </tr>
  </tbody>
</table>
</div>


### Calculate monthly excess return of fund and portfolio


\`\`\`python
monthly_excess_return_table = monthly_return_table.copy()
monthly_excess_return_table = monthly_excess_return_table.apply(lambda x: x - fama_french['RF'].values, axis=0)
monthly_excess_return_table.columns = [col + '_excess_return' for col in monthly_excess_return_table.columns]
display(monthly_excess_return_table.head(), monthly_excess_return_table.tail())
\`\`\`


<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>VYM_excess_return</th>
      <th>risk_free_excess_return</th>
      <th>^RUT_excess_return</th>
      <th>^DJI_excess_return</th>
      <th>^GSPC_excess_return</th>
      <th>^IXIC_excess_return</th>
      <th>^FTSE_excess_return</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>201906</th>
      <td>0.056967</td>
      <td>0.0</td>
      <td>0.067173</td>
      <td>0.070129</td>
      <td>0.067130</td>
      <td>0.072409</td>
      <td>0.035049</td>
    </tr>
    <tr>
      <th>201907</th>
      <td>0.012613</td>
      <td>0.0</td>
      <td>0.003232</td>
      <td>0.008036</td>
      <td>0.011228</td>
      <td>0.019231</td>
      <td>0.019809</td>
    </tr>
    <tr>
      <th>201908</th>
      <td>-0.022620</td>
      <td>0.0</td>
      <td>-0.052260</td>
      <td>-0.018760</td>
      <td>-0.019692</td>
      <td>-0.027597</td>
      <td>-0.051634</td>
    </tr>
    <tr>
      <th>201909</th>
      <td>0.028028</td>
      <td>0.0</td>
      <td>0.017286</td>
      <td>0.017650</td>
      <td>0.015381</td>
      <td>0.002779</td>
      <td>0.026089</td>
    </tr>
    <tr>
      <th>201910</th>
      <td>0.017836</td>
      <td>0.0</td>
      <td>0.024054</td>
      <td>0.003207</td>
      <td>0.018832</td>
      <td>0.035031</td>
      <td>-0.023171</td>
    </tr>
  </tbody>
</table>
</div>



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>VYM_excess_return</th>
      <th>risk_free_excess_return</th>
      <th>^RUT_excess_return</th>
      <th>^DJI_excess_return</th>
      <th>^GSPC_excess_return</th>
      <th>^IXIC_excess_return</th>
      <th>^FTSE_excess_return</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>202401</th>
      <td>0.012882</td>
      <td>0.0</td>
      <td>-0.044033</td>
      <td>0.007525</td>
      <td>0.011196</td>
      <td>0.005470</td>
      <td>-0.017967</td>
    </tr>
    <tr>
      <th>202402</th>
      <td>0.022029</td>
      <td>0.0</td>
      <td>0.051004</td>
      <td>0.017978</td>
      <td>0.047521</td>
      <td>0.056992</td>
      <td>-0.004279</td>
    </tr>
    <tr>
      <th>202403</th>
      <td>0.043958</td>
      <td>0.0</td>
      <td>0.029625</td>
      <td>0.016496</td>
      <td>0.026719</td>
      <td>0.013569</td>
      <td>0.037980</td>
    </tr>
    <tr>
      <th>202404</th>
      <td>-0.036662</td>
      <td>0.0</td>
      <td>-0.075604</td>
      <td>-0.054727</td>
      <td>-0.046315</td>
      <td>-0.048758</td>
      <td>0.019380</td>
    </tr>
    <tr>
      <th>202405</th>
      <td>0.025908</td>
      <td>0.0</td>
      <td>0.044346</td>
      <td>0.018617</td>
      <td>0.043621</td>
      <td>0.064396</td>
      <td>0.011722</td>
    </tr>
  </tbody>
</table>
</div>


### Calculate regression coefficient


\`\`\`python
# Define the objective function (sum of squared residuals)
def objective_function(params, ref_df, funds_excess_df, date_index):
    # date_index in the format of example: '201907'
    alpha, weights = params[0], params[1:]
    # Get the start and end row of the window
    end_index = funds_excess_df.index.get_loc(date_index)
    earliest_index = end_index - window_size

    accum_sum_residuals_square = 0 # add up the residuals squared
    
    for index in range(end_index, earliest_index, -1):
        # alpha + sum(beta * excess_return)
      predicted_return = (alpha + sum(funds_excess_df.iloc[index, 2:].mul(weights)))
        # regression formula = R(t) - alpha - sum(beta * excess_return)
      residuals = funds_excess_df[fund_tick + '_excess_return'].iloc[index] - predicted_return
      # print(funds_excess_df.index[index], f"{residuals**2:.5f}")
      accum_sum_residuals_square += residuals**2
    # print('\\t\\t', accum_sum_residuals_square)
    return accum_sum_residuals_square

### Sample Run
test_date = '202206'
constraints = {'type': 'eq', 'fun': lambda params: params[1:].sum() - 1} # constraint that sum of weight must be 1
initial_guess = [0] + [1/n_funds for i in range(n_funds)]  # guess zero alpha and equal weights

# Define the bounds:
# => Alpha can be any number, but the weights must be non-negative (0 <= w <= 1)
# => No weights can be more than 1 as it would imply another weight is negative
bounds = [(None, None)] + [(0, 1) for i in range(n_funds)]

# Minimize the sum of squared residuals, test solver for 1 date
result = minimize(objective_function,
                  initial_guess,
                  args=(monthly_return_table, monthly_excess_return_table, test_date,),
                  constraints=constraints,
                  bounds=bounds,
                  method='SLSQP')

# Print solver results
print("Optimized parameters:\\talpha", *[f"{r:<5}" for r in reference_funds], sep='\\t')
print("Optimized weights:", *[f"{r:.4f}" for r in result.x], sep='\\t')
print("Final value of objective function: ", result.fun) # sum of residual squared
\`\`\`

    Optimized parameters:	alpha	^RUT 	^DJI 	^GSPC	^IXIC	^FTSE
    Optimized weights:	0.0034	0.0373	0.3840	0.2952	0.0000	0.2835
    Final value of objective function:  0.00876929724426853



\`\`\`python
start_index = monthly_excess_return_table.index.get_loc(style_analysis_start_date)
column_name = ["Min Residual Sq", "Alpha"] + [fund_name + "_weight" for fund_name in reference_funds]
weight_table = pd.DataFrame({}, columns=column_name)

constraints = {'type': 'eq', 'fun': lambda params: params[1:].sum() - 1}
initial_guess = [0] + [1/n_funds for i in range(n_funds)]
bounds = [(None, None)] + [(0, 1) for i in range(n_funds)]

# Run solver for all dates and store results, will take a while if many funds or dates
for i in range(start_index, len(dates)):
  result = minimize(objective_function,
                  initial_guess,
                  args=(monthly_return_table, monthly_excess_return_table, dates[i],),
                  constraints=constraints,
                  bounds=bounds,
                  method='SLSQP')
  weight_table.loc[dates[i]] = result.fun, *result.x

display(weight_table.head(), weight_table.tail())
\`\`\`


<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Min Residual Sq</th>
      <th>Alpha</th>
      <th>^RUT_weight</th>
      <th>^DJI_weight</th>
      <th>^GSPC_weight</th>
      <th>^IXIC_weight</th>
      <th>^FTSE_weight</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>202205</th>
      <td>0.008377</td>
      <td>0.003978</td>
      <td>0.032282</td>
      <td>0.390911</td>
      <td>0.278223</td>
      <td>1.879736e-17</td>
      <td>0.298584</td>
    </tr>
    <tr>
      <th>202206</th>
      <td>0.008769</td>
      <td>0.003429</td>
      <td>0.037339</td>
      <td>0.383979</td>
      <td>0.295232</td>
      <td>9.222495e-18</td>
      <td>0.283450</td>
    </tr>
    <tr>
      <th>202207</th>
      <td>0.008962</td>
      <td>0.003229</td>
      <td>0.025685</td>
      <td>0.388995</td>
      <td>0.286909</td>
      <td>2.148076e-17</td>
      <td>0.298411</td>
    </tr>
    <tr>
      <th>202208</th>
      <td>0.008984</td>
      <td>0.003351</td>
      <td>0.031905</td>
      <td>0.379473</td>
      <td>0.281388</td>
      <td>0.000000e+00</td>
      <td>0.307233</td>
    </tr>
    <tr>
      <th>202209</th>
      <td>0.009038</td>
      <td>0.002856</td>
      <td>0.034620</td>
      <td>0.384121</td>
      <td>0.287707</td>
      <td>0.000000e+00</td>
      <td>0.293551</td>
    </tr>
  </tbody>
</table>
</div>



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Min Residual Sq</th>
      <th>Alpha</th>
      <th>^RUT_weight</th>
      <th>^DJI_weight</th>
      <th>^GSPC_weight</th>
      <th>^IXIC_weight</th>
      <th>^FTSE_weight</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>202401</th>
      <td>0.005512</td>
      <td>0.002394</td>
      <td>0.018582</td>
      <td>0.783008</td>
      <td>0.000000e+00</td>
      <td>4.798611e-17</td>
      <td>0.198410</td>
    </tr>
    <tr>
      <th>202402</th>
      <td>0.005310</td>
      <td>0.002066</td>
      <td>0.009599</td>
      <td>0.789393</td>
      <td>5.558569e-17</td>
      <td>0.000000e+00</td>
      <td>0.201008</td>
    </tr>
    <tr>
      <th>202403</th>
      <td>0.005725</td>
      <td>0.002688</td>
      <td>0.018672</td>
      <td>0.769863</td>
      <td>0.000000e+00</td>
      <td>2.690177e-17</td>
      <td>0.211465</td>
    </tr>
    <tr>
      <th>202404</th>
      <td>0.005724</td>
      <td>0.002685</td>
      <td>0.019147</td>
      <td>0.767178</td>
      <td>0.000000e+00</td>
      <td>0.000000e+00</td>
      <td>0.213675</td>
    </tr>
    <tr>
      <th>202405</th>
      <td>0.005628</td>
      <td>0.002565</td>
      <td>0.026383</td>
      <td>0.758571</td>
      <td>0.000000e+00</td>
      <td>3.355945e-18</td>
      <td>0.215046</td>
    </tr>
  </tbody>
</table>
</div>


### Weight Analysis


\`\`\`python
# Data frame of max, min, average weight
weight_stats = pd.concat([weight_table.max(), weight_table.mean(), weight_table.min() , weight_table.std()], axis=1)
weight_stats.style.set_caption("Statistics of weight values")
weight_stats.columns = ['Max', 'Mean', 'Min', 'Std']
display(weight_stats.T)

# Correlation of the weights
weight_tab = pd.DataFrame(weight_table.corr().iloc[0]).style.set_caption("Correlation of weight values")
display(weight_tab)

ex_return_corr_table = pd.concat([monthly_return_table, monthly_excess_return_table], axis=1).corr()
# print(corr_table.loc['ORP_excess_return'])
r_square_table = ex_return_corr_table.loc[fund_tick + '_excess_return'].apply(lambda x: x**2).sort_values(ascending=False)
# Convert the Series to a DataFrame to use style
r_square_table = pd.DataFrame(r_square_table).style.set_caption("R^2 values")
display(r_square_table)
\`\`\`


<style type="text/css">
</style>
<table id="T_43246">
  <caption>Correlation of weight values</caption>
  <thead>
    <tr>
      <th class="blank level0" >&nbsp;</th>
      <th id="T_43246_level0_col0" class="col_heading level0 col0" >Min Residual Sq</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="T_43246_level0_row0" class="row_heading level0 row0" >Min Residual Sq</th>
      <td id="T_43246_row0_col0" class="data row0 col0" >1.000000</td>
    </tr>
    <tr>
      <th id="T_43246_level0_row1" class="row_heading level0 row1" >Alpha</th>
      <td id="T_43246_row1_col0" class="data row1 col0" >0.294611</td>
    </tr>
    <tr>
      <th id="T_43246_level0_row2" class="row_heading level0 row2" >^RUT_weight</th>
      <td id="T_43246_row2_col0" class="data row2 col0" >0.317107</td>
    </tr>
    <tr>
      <th id="T_43246_level0_row3" class="row_heading level0 row3" >^DJI_weight</th>
      <td id="T_43246_row3_col0" class="data row3 col0" >-0.447046</td>
    </tr>
    <tr>
      <th id="T_43246_level0_row4" class="row_heading level0 row4" >^GSPC_weight</th>
      <td id="T_43246_row4_col0" class="data row4 col0" >0.417731</td>
    </tr>
    <tr>
      <th id="T_43246_level0_row5" class="row_heading level0 row5" >^IXIC_weight</th>
      <td id="T_43246_row5_col0" class="data row5 col0" >-0.214566</td>
    </tr>
    <tr>
      <th id="T_43246_level0_row6" class="row_heading level0 row6" >^FTSE_weight</th>
      <td id="T_43246_row6_col0" class="data row6 col0" >0.249438</td>
    </tr>
  </tbody>
</table>




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Min Residual Sq</th>
      <th>Alpha</th>
      <th>^RUT_weight</th>
      <th>^DJI_weight</th>
      <th>^GSPC_weight</th>
      <th>^IXIC_weight</th>
      <th>^FTSE_weight</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Max</th>
      <td>0.009622</td>
      <td>0.003978</td>
      <td>0.085896</td>
      <td>0.789393</td>
      <td>0.295232</td>
      <td>4.956667e-17</td>
      <td>0.307233</td>
    </tr>
    <tr>
      <th>Mean</th>
      <td>0.007672</td>
      <td>0.003051</td>
      <td>0.048457</td>
      <td>0.668875</td>
      <td>0.063806</td>
      <td>1.488411e-17</td>
      <td>0.218862</td>
    </tr>
    <tr>
      <th>Min</th>
      <td>0.005310</td>
      <td>0.002066</td>
      <td>0.009599</td>
      <td>0.379473</td>
      <td>0.000000</td>
      <td>0.000000e+00</td>
      <td>0.169517</td>
    </tr>
    <tr>
      <th>Std</th>
      <td>0.001652</td>
      <td>0.000533</td>
      <td>0.023170</td>
      <td>0.147163</td>
      <td>0.114135</td>
      <td>1.650180e-17</td>
      <td>0.043151</td>
    </tr>
  </tbody>
</table>
</div>



<style type="text/css">
</style>
<table id="T_76a12">
  <caption>R^2 values</caption>
  <thead>
    <tr>
      <th class="blank level0" >&nbsp;</th>
      <th id="T_76a12_level0_col0" class="col_heading level0 col0" >VYM_excess_return</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="T_76a12_level0_row0" class="row_heading level0 row0" >VYM_excess_return</th>
      <td id="T_76a12_row0_col0" class="data row0 col0" >1.000000</td>
    </tr>
    <tr>
      <th id="T_76a12_level0_row1" class="row_heading level0 row1" >VYM</th>
      <td id="T_76a12_row1_col0" class="data row1 col0" >0.998780</td>
    </tr>
    <tr>
      <th id="T_76a12_level0_row2" class="row_heading level0 row2" >^DJI_excess_return</th>
      <td id="T_76a12_row2_col0" class="data row2 col0" >0.906148</td>
    </tr>
    <tr>
      <th id="T_76a12_level0_row3" class="row_heading level0 row3" >^DJI</th>
      <td id="T_76a12_row3_col0" class="data row3 col0" >0.903443</td>
    </tr>
    <tr>
      <th id="T_76a12_level0_row4" class="row_heading level0 row4" >^GSPC_excess_return</th>
      <td id="T_76a12_row4_col0" class="data row4 col0" >0.814882</td>
    </tr>
    <tr>
      <th id="T_76a12_level0_row5" class="row_heading level0 row5" >^GSPC</th>
      <td id="T_76a12_row5_col0" class="data row5 col0" >0.810587</td>
    </tr>
    <tr>
      <th id="T_76a12_level0_row6" class="row_heading level0 row6" >^RUT_excess_return</th>
      <td id="T_76a12_row6_col0" class="data row6 col0" >0.729514</td>
    </tr>
    <tr>
      <th id="T_76a12_level0_row7" class="row_heading level0 row7" >^RUT</th>
      <td id="T_76a12_row7_col0" class="data row7 col0" >0.728291</td>
    </tr>
    <tr>
      <th id="T_76a12_level0_row8" class="row_heading level0 row8" >^FTSE_excess_return</th>
      <td id="T_76a12_row8_col0" class="data row8 col0" >0.635185</td>
    </tr>
    <tr>
      <th id="T_76a12_level0_row9" class="row_heading level0 row9" >^FTSE</th>
      <td id="T_76a12_row9_col0" class="data row9 col0" >0.631154</td>
    </tr>
    <tr>
      <th id="T_76a12_level0_row10" class="row_heading level0 row10" >^IXIC_excess_return</th>
      <td id="T_76a12_row10_col0" class="data row10 col0" >0.533775</td>
    </tr>
    <tr>
      <th id="T_76a12_level0_row11" class="row_heading level0 row11" >^IXIC</th>
      <td id="T_76a12_row11_col0" class="data row11 col0" >0.529871</td>
    </tr>
    <tr>
      <th id="T_76a12_level0_row12" class="row_heading level0 row12" >risk_free</th>
      <td id="T_76a12_row12_col0" class="data row12 col0" >0.006379</td>
    </tr>
    <tr>
      <th id="T_76a12_level0_row13" class="row_heading level0 row13" >risk_free_excess_return</th>
      <td id="T_76a12_row13_col0" class="data row13 col0" >nan</td>
    </tr>
  </tbody>
</table>



### Visualize Style Analysis



\`\`\`python
palette = sns.color_palette("Spectral", n_colors=len(reference_funds))[::-1] # color of the legend
plt.figure(figsize=(10, 6)) # size of figure
plt.stackplot(weight_table.index.tolist(), weight_table.iloc[:, 2:].T, labels=reference_funds, colors = palette)
plt.legend(reverse=True, fontsize='large')
plt.gca().yaxis.set_major_formatter(mtick.PercentFormatter(1.0))
plt.gca().yaxis.set_major_locator(plt.MultipleLocator(0.2))
plt.xlabel('Date', fontsize='medium')
plt.ylabel('Weight', fontsize='medium')
plt.title(fund_tick + ' Weight distribution over Time of ' + title, fontsize='x-large')
plt.xticks(rotation=45, fontsize='small')
plt.yticks(fontsize='small')
plt.tight_layout()
plt.grid(axis='x', color='w', linestyle='-', linewidth=1)
plt.grid(axis='y', color='b', linestyle='--', linewidth=1)
plt.show()
\`\`\`


    
![Style Analysis Graph](https://github.com/CheahHaoYi/CheahHaoYi.github.io/blob/main/src/lib/data/md_project/Portfolio_Style_Analysis_files/Portfolio_Style_Analysis_19_0.png?raw=true)    

`,a=`# **Carpark Availability Prediction and Recommendation System**

Collaborators:
- Cheah Hao Yi 
- Chao Yi-Ju 
- Ayyappan Harikrishnan 
- Wu Yun Hsuan 

### Introduction

This project aims to explore different aspect of machine learning model that predicts carpark availability based on historical data and user geolocation. Furthermore, we include the weather data, and explored its correlation with carparks' availability.


### Proposed Solution 

Our approach involves using the HDB carpark info dataset, which provides details on various carparks, including their locations, costs, and opening hours. We will also analyze historical occupancy data from the Land Transport Authority (LTA) to identify patterns in parking availability. Furthermore, we will explore the correlation between rainfall and carpark availability to determine if it can assist in carpark availability prediction.

<br>


| Data Attribute|Source| Remarks|
|---------------|------|--------|
| Geo-coordinates of current/final destination | User Input | To provide best carpark recommendations based on estimated time of arrival and carparks near destination |
| Geo-coordinates of carparks   | [Carpark Info Dataset](https://data.gov.sg/dataset/hdb-carpark-information) | To recommend carparks based on distance from destination   |
| Cost of parking | [Carpark Info Dataset](https://data.gov.sg/dataset/hdb-carpark-information)  | To recommend carparks based on cost |
| Carpark opening hours  | [Carpark Info Dataset](https://data.gov.sg/dataset/hdb-carpark-information)  | To recommend carparks that are open during user's time of arrival  |
| Carpark availability | [Carpark Availability Dataset](https://data.gov.sg/dataset/carpark-availability)    | To recommend carparks based on availability  |
| Rainfall | [Rainfall Across Singapore Dataset](https://data.gov.sg/datasets/d_6580738cdd7db79374ed3152159fbd69/view#tag/default/GET/rainfall) | To find correlation to carparks availability |
| Weather Forecast | [24-hour Weather Forecast](https://data.gov.sg/datasets?query=weather&page=1&resultId=d_ce2eb1e307bda31993c533285834ef2b#tag/default/GET/two-hr-forecast) | To find correlation to carparks availability

<br>


### Potential Enhancement

Other Weather Data Integration: Our proposal only includes rainfall data for prediction; however, there might be correlation between parking availability and other weather conditions. The potential dataset to include would be [4-day Weather Forecast from NEA](https://data.gov.sg/datasets/d_f131f6e343bf8168e4057a04c4326a0a/view#tag/default/GET/four-day-outlook).

Traffic Density Data: Integrating traffic data to analyze whether nearby traffic density affects parking availability is likely to improve the prediction as well. It could help the model predict high-demand scenarios when traffic surges near specific carparks.


### Section 1
In this section, we will explore various aspects of machine learning models using the provided dataset. Additionally, we will incorporate supplementary datasets, such as weather data, to enhance our analysis. We will examine unaggregated data and investigate differences in carpark availability, including factors like free parking. Feel free to expand on the initial proposal and explore additional insights.

### Machine Learning:
#### The machine learning component of the recommendation system is responsible for predicting parking availability at the specified time. Using historical carpark availability data and rainfall information, the model will learn to identify patterns in parking occupancy.

### A ML system is implemented using the following data to predict hourly availability:

- **Training Data**: January 2023 (1 month worth)
- **Testing Data**: First half of January 2024 (2 weeks worth)
- **Forecasting Data**: Second half of January 2024 (2 weeks worth), new unseen data to simulate model prediction in the real world



\`\`\`python
# run this cell if running on google colab
from google.colab import drive
drive.mount('/content/drive')

import os
google_colab_path = '/content/drive/MyDrive/' + 'Colab Notebooks/' ### Edit the path to point to the directory with the file ###
os.chdir(google_colab_path)
os.listdir()
\`\`\`

## Preparing Data for Training Models

The following sections are the code for processing the data and training the ML models.

## Data Retrieval and Data Cleaning Steps

- **Define Timestamp Format**: Set the format for timestamps as \`'%Y-%m-%d %H:%M'\`.

- **Fetch Carpark Data**:
    - Define the function \`fetch_carpark_data\` to fetch carpark data from the API.
    - Parameters include year, month, day, hour, minute, and second.
    - Construct the API URL using the provided parameters.
    - Make a GET request to the API.
    - Parse the response JSON and return the carpark data.

- **Process Data**:
    - Define the function \`process_data\` to process the fetched data into a DataFrame.
    - Parameters include the JSON data and an optional filter list.
    - Extract the timestamp and carpark data from the JSON.
    - Iterate through the carpark data and filter based on the carpark number if a filter list is provided.
    - Calculate the occupancy rate for each carpark.
    - Clean the data if the occupancy rate is greater than 1
        - From observation, there are some data where the \`lots_available\` is more than \`total_lots\`
    - Convert the update time and timestamp to the defined format.
    - Return the processed data as a DataFrame.

- **Fetch and Process Data**:
    - Fetch the carpark data using \`fetch_carpark_data\`.
    - Process the fetched data using \`process_data\`.
    - Display the processed data.




\`\`\`python
import requests
import json
import pandas as pd
from IPython.display import display

timestamp_format = '%Y-%m-%d %H:%M'

def fetch_carpark_data(year=2023, month=1, day=1, hour=0, minute=30, second=0):
  '''
  Fetch carpark data from the API given the year, month, day, hour, minute, and second
  '''
  site = f'https://api.data.gov.sg/v1/transport/carpark-availability?date_time={str(year)}-{str(month).zfill(2)}-{str(day).zfill(2)}T{str(hour).zfill(2)}%3A{str(minute).zfill(2)}%3A{str(second).zfill(2)}'
  data = json.loads(requests.get(site).text)
  return data["items"][0] if ("items" in data and len(data["items"]) > 0) else None

def process_data(data_json, filter_list=None):
  '''
  Process the data from the API into a DataFrame with the columns "carpark_number", "update_datetime", "total_lots", "lot_type", "lots_available", "timestamp"
  '''
  if data_json is None:
    return None
  timestamp, datas = data_json["timestamp"], data_json["carpark_data"]
  carpark_list = []

  for data in datas:
    if filter_list and data["carpark_number"] not in filter_list:
      continue

    carpark_info = data["carpark_info"][0]
    carpark_info["carpark_number"] = data["carpark_number"]
    carpark_info["occupancy_rate"] = int(carpark_info["lots_available"]) / int(carpark_info["total_lots"]) if int(carpark_info["total_lots"]) != 0 else 0
    if carpark_info["occupancy_rate"] > 1: # clean data if lots_available > total_lots
      carpark_info["occupancy_rate"] = 1

    carpark_info["time_update"] = data["update_datetime"]
    carpark_info["timestamp"] = timestamp
    carpark_list.append(carpark_info)

  data_df = pd.DataFrame(carpark_list)
  data_df['time_update'] = pd.to_datetime(data_df['time_update']).dt.strftime(timestamp_format)
  data_df['timestamp'] = pd.to_datetime(data_df['timestamp']).dt.strftime(timestamp_format)
  return data_df

data = fetch_carpark_data()
data_df = process_data(data)
display(data_df.head())
\`\`\`


<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>total_lots</th>
      <th>lot_type</th>
      <th>lots_available</th>
      <th>carpark_number</th>
      <th>occupancy_rate</th>
      <th>time_update</th>
      <th>timestamp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>105</td>
      <td>C</td>
      <td>47</td>
      <td>HE12</td>
      <td>0.447619</td>
      <td>2023-01-01 00:28</td>
      <td>2023-01-01 00:29</td>
    </tr>
    <tr>
      <th>1</th>
      <td>583</td>
      <td>C</td>
      <td>384</td>
      <td>HLM</td>
      <td>0.658662</td>
      <td>2023-01-01 00:28</td>
      <td>2023-01-01 00:29</td>
    </tr>
    <tr>
      <th>2</th>
      <td>329</td>
      <td>C</td>
      <td>158</td>
      <td>RHM</td>
      <td>0.480243</td>
      <td>2023-01-01 00:28</td>
      <td>2023-01-01 00:29</td>
    </tr>
    <tr>
      <th>3</th>
      <td>97</td>
      <td>C</td>
      <td>79</td>
      <td>BM29</td>
      <td>0.814433</td>
      <td>2023-01-01 00:28</td>
      <td>2023-01-01 00:29</td>
    </tr>
    <tr>
      <th>4</th>
      <td>96</td>
      <td>C</td>
      <td>73</td>
      <td>Q81</td>
      <td>0.760417</td>
      <td>2023-01-01 00:28</td>
      <td>2023-01-01 00:29</td>
    </tr>
  </tbody>
</table>
</div>


High level understanding of the data provided, from below, we conclude that:
- there are close to 2000 carparks available for analysis
    - we concluded that it is better to simplify the project by focusing on a few carparks
- Each car park have a unique identifier as shown




\`\`\`python
display(data_df.describe())
cp_nums = data_df['carpark_number'].unique().tolist()
print(f"Number of unique carpark numbers: {len(cp_nums)}")
for i in range(0, len(cp_nums[:100]), 10):
    print(*cp_nums[i:i+10], sep='\\t',end='\\n')
\`\`\`


<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>occupancy_rate</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>1918.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>0.465639</td>
    </tr>
    <tr>
      <th>std</th>
      <td>0.228088</td>
    </tr>
    <tr>
      <th>min</th>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>0.323200</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>0.476117</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>0.611961</td>
    </tr>
    <tr>
      <th>max</th>
      <td>1.000000</td>
    </tr>
  </tbody>
</table>
</div>


    Number of unique carpark numbers: 1913
    HE12	HLM	RHM	BM29	Q81	C20	FR3M	C32	C6	TG2
    BP1	TG1	TGM2	TE14	BM3	BM9	HG44	HG64	PM27	PM28
    TM36	TM37	T50	T51	TM43	T15	T16	T17	T18	B9
    B10	B14	WCB	ACB	CY	AM46	A12	BE45	BE39	BE40
    Y79M	CR29	KLM	SE34	KB7	SE31	J56	J57	J57L	J33
    J34	BL8	J36	J54	J55	J43	J46	KB1	GBM	SE14
    SE50	J40	JM1	J32	A11	TR1	JBM	TE2	CR31	J1
    J2	J3	T37	KB3	KBM	J4	TGM1	TG3	TG6	TG7
    CR30	RCM	EPM	TGM3	KB14	J41	JBM2	J39	J52	J51
    J53	T19	J49	J27	TB14	U19	U6	U45	BBM7	BE12


Using the function defined above, we fetch the carpark data for a specific day using concurrency to speed up the process.

We defined the parameters below for fetching 1-day worth of data:
    - \`time_interval\` is set to 15 minutes, meaning data will be fetched every 15 minutes.
    - \`hours_in_day\` is set to 24, representing the 24 hours in a day.
    - \`minutes_in_hour\` is set to 60, representing the 60 minutes in an hour.


Using Concurrency with ThreadPoolExecutor:
    - A \`ThreadPoolExecutor\` is used to run multiple threads concurrently.
    - The \`executor.submit\` method is used to submit the \`fetch_and_process\` function for each combination of hour and minute (every 15 minutes).
    - The \`concurrent.futures.as_completed\` method is used to iterate over the completed futures.
    - The results are appended to \`data_list\` if they are not \`None\` and not empty.
    - The \`pd.concat\` method is used to concatenate all the dataframes in \`data_list\`.
    - The \`drop_duplicates\` method is used to remove duplicate rows.
    - The \`sort_values\` method is used to sort the dataframe by the \`timestamp\` column.
    - With concurrency, the execution time is about 10 seconds for 1 day worth of data

An alternative implementation of the \`fetch_day_carpark_data\` function without concurrency is provided but commented out. This version takes about 2 minutes for 1 day worth of data



\`\`\`python
import concurrent.futures

def fetch_day_carpark_data(year=2023, month=1, day=1, filter_list=None): # takes about 10 sec for 1 day locally, a lot slower on google colab
  '''
  Fetch carpark data for a day given the year, month, and day using concurrency
  '''
  time_interval = 15
  hours_in_day = 24
  minutes_in_hour = 60
  data_list = []

  def fetch_and_process(hour, minute):
    data = fetch_carpark_data(year, month, day, hour, minute)
    return process_data(data, filter_list)

  with concurrent.futures.ThreadPoolExecutor() as executor:
    futures = [executor.submit(fetch_and_process, hour, minute)
           for hour in range(hours_in_day)
           for minute in range(0, minutes_in_hour, time_interval)]
    for future in concurrent.futures.as_completed(futures):
      result = future.result()
      if result is not None and not result.empty:
        data_list.append(result)

  return pd.concat(data_list, ignore_index=True).drop_duplicates().sort_values(by=['timestamp'])

day_data_df = fetch_day_carpark_data()
display(day_data_df.head())

# def fetch_day_carpark_data(year=2024, month=1, day=1): # takes about 2 minute for 1 day
#   '''
#   Fetch carpark data for a day given the year, month, and day
#   '''
#   time_interval = 15
#   hours_in_day = 24
#   minutes_in_hour = 60
#   data_list = []
#   for hour in range(hours_in_day):
#     for minute in range(0, minutes_in_hour, time_interval):
#       data = fetch_carpark_data(year, month, day, hour, minute)
#       data_df = process_data(data)
#       if data_df is not None and not data_df.empty:
#         data_list.append(data_df)
#   return pd.concat(data_list, ignore_index=True).drop_duplicates().sort_values(by=['timestamp'])
# day_data_df = fetch_day_carpark_data()
# display(day_data_df)
\`\`\`


<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>total_lots</th>
      <th>lot_type</th>
      <th>lots_available</th>
      <th>carpark_number</th>
      <th>occupancy_rate</th>
      <th>time_update</th>
      <th>timestamp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>41678</th>
      <td>537</td>
      <td>C</td>
      <td>374</td>
      <td>JM27</td>
      <td>0.696462</td>
      <td>2023-01-01 00:13</td>
      <td>2023-01-01 00:14</td>
    </tr>
    <tr>
      <th>41533</th>
      <td>81</td>
      <td>C</td>
      <td>54</td>
      <td>Q67</td>
      <td>0.666667</td>
      <td>2023-01-01 00:11</td>
      <td>2023-01-01 00:14</td>
    </tr>
    <tr>
      <th>41532</th>
      <td>30</td>
      <td>C</td>
      <td>3</td>
      <td>Q70</td>
      <td>0.100000</td>
      <td>2023-01-01 00:11</td>
      <td>2023-01-01 00:14</td>
    </tr>
    <tr>
      <th>41531</th>
      <td>49</td>
      <td>C</td>
      <td>0</td>
      <td>Q73</td>
      <td>0.000000</td>
      <td>2023-01-01 00:11</td>
      <td>2023-01-01 00:14</td>
    </tr>
    <tr>
      <th>41530</th>
      <td>50</td>
      <td>C</td>
      <td>30</td>
      <td>BR9</td>
      <td>0.600000</td>
      <td>2023-01-01 00:13</td>
      <td>2023-01-01 00:14</td>
    </tr>
  </tbody>
</table>
</div>


Here, we split the data into smaller groups for easier visualization



\`\`\`python
# Split the carpark numbers into 8 groups
cp_num_list = day_data_df['carpark_number'].unique().tolist()
num_groups = 100
carpark_groups = [cp_num_list[i::num_groups] for i in range(num_groups)]
# Split the data_df accordingly
data_groups = [day_data_df[day_data_df['carpark_number'].isin(group)] for group in carpark_groups]

# Display the number of carparks in each group
print(f"{num_groups} groups in total; Number of carparks in each group:")
for i, group in enumerate(carpark_groups[:20]):
    print(f"Group {i+1}: {len(group)} carparks, {len(data_groups[i])} rows")

# Display the first few rows of each split dataframe, ONLY PRINT IF THE NUMBER OF GROUPS IS SMALL
# for i, df in enumerate(data_groups):
#     display(df.head(2), df.tail(2))
\`\`\`

    100 groups in total; Number of carparks in each group:
    Group 1: 20 carparks, 1901 rows
    Group 2: 20 carparks, 1901 rows
    Group 3: 20 carparks, 1900 rows
    Group 4: 20 carparks, 1901 rows
    Group 5: 20 carparks, 1900 rows
    Group 6: 20 carparks, 1902 rows
    Group 7: 20 carparks, 1905 rows
    Group 8: 20 carparks, 1906 rows
    Group 9: 20 carparks, 1908 rows
    Group 10: 20 carparks, 1902 rows
    Group 11: 20 carparks, 1902 rows
    Group 12: 20 carparks, 1903 rows
    Group 13: 20 carparks, 1903 rows
    Group 14: 19 carparks, 1805 rows
    Group 15: 19 carparks, 1812 rows
    Group 16: 19 carparks, 1808 rows
    Group 17: 19 carparks, 1807 rows
    Group 18: 19 carparks, 1806 rows
    Group 19: 19 carparks, 1806 rows
    Group 20: 19 carparks, 1807 rows


We plot the occupancy rate for each carpark over the course of 1 day, our observations are as follows:
- Some carpark has a **minimum occupancy rate** of **1**
    - meaning that the carpark will always be full
    - we will discard such carpark as abnormaly because it is not useful for a user who is trying to find carpark
- Some carpark has a **maximum occupancy rate** of **0**
    - meaning that the carpark will always be empty
    - we will discard such carpark as abnormaly because it might be that the carpark is unusable hence empty
- Some carpark has a **standard deviation** of **0**:
    - meaning that the carpark availability never changes
    - we will discard such carpark as abnormaly because there's no car that can enter nor leave the carpark

After discarding the data, we still have about 1700 carparks left


\`\`\`python
import seaborn as sns
import matplotlib.pyplot as plt

num_groups_to_plot = 20
num_cols = 2
num_rows = num_groups_to_plot // num_cols
# Set the figure size
fig, axes = plt.subplots(num_rows, num_cols, figsize=(10 * num_cols, 5 * num_rows), sharex=True, sharey=True)
axes = axes.flatten() # Flatten the axes array for easy iteration

# Plot the occupancy rate over time for each carpark_number in the first few data groups
for idx, ax in enumerate(axes[:num_groups_to_plot]):
    sns.lineplot(data=data_groups[idx], x='timestamp', y='occupancy_rate', hue='carpark_number', legend=None, ax=ax)
    ax.set_title(f'Occupancy Rate of Carparks in Group {idx + 1}')
    ax.set_xlabel('Timestamp')
    ax.set_ylabel('Occupancy Rate')
    ax.tick_params(axis='x', rotation=45)
    ax.xaxis.set_major_locator(plt.MaxNLocator(nbins=24))
# Adjust layout
plt.tight_layout()
plt.show()
\`\`\`


    
![png](https://github.com/CheahHaoYi/CheahHaoYi.github.io/blob/main/src/lib/data/md_project/Carpark_Availability_Prediction_files/Carpark_Availability_Prediction_18_0.png?raw=true)


\`\`\`python
# Group the data by carpark number
grouped_data = day_data_df.groupby('carpark_number')
# Calculate the max, min, average, and standard deviation for each carpark number
stats = grouped_data['occupancy_rate'].agg(['max', 'min', 'mean', 'std']).reset_index()
# Rename the columns for clarity
stats.columns = ['carpark_number', 'max_occupancy_rate', 'min_occupancy_rate', 'avg_occupancy_rate', 'std_occupancy_rate']
# Display the statistics by sorting the average occupancy rate in descending order
display(stats.sort_values(by='avg_occupancy_rate', ascending=False).head())
\`\`\`


<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>carpark_number</th>
      <th>max_occupancy_rate</th>
      <th>min_occupancy_rate</th>
      <th>avg_occupancy_rate</th>
      <th>std_occupancy_rate</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>961</th>
      <td>P6L</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>166</th>
      <td>B90</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>398</th>
      <td>CC1</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>246</th>
      <td>BJ26</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>1293</th>
      <td>SK18</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
</div>



\`\`\`python
# Dropp abonormal values
# Disclaimer: comparison on float values may not be accurate due to floating point precision
stats_reduced = stats[(stats['min_occupancy_rate'] != 1)
              & (stats['max_occupancy_rate'] != 0)
              & (stats['std_occupancy_rate'] != 0.0)]
display(stats_reduced.sort_values(by='avg_occupancy_rate', ascending=False).head())
carpark_num_reduced = stats_reduced['carpark_number'].unique().tolist()
print(f"Number of unique carpark numbers after filtering: {len(carpark_num_reduced)}")
\`\`\`


<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>carpark_number</th>
      <th>max_occupancy_rate</th>
      <th>min_occupancy_rate</th>
      <th>avg_occupancy_rate</th>
      <th>std_occupancy_rate</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>181</th>
      <td>BA7</td>
      <td>0.9975</td>
      <td>0.992500</td>
      <td>0.996868</td>
      <td>0.001670</td>
    </tr>
    <tr>
      <th>182</th>
      <td>BA8</td>
      <td>0.9980</td>
      <td>0.994000</td>
      <td>0.995979</td>
      <td>0.000989</td>
    </tr>
    <tr>
      <th>1051</th>
      <td>PM15</td>
      <td>1.0000</td>
      <td>0.986000</td>
      <td>0.994811</td>
      <td>0.003416</td>
    </tr>
    <tr>
      <th>1470</th>
      <td>TBL</td>
      <td>0.9970</td>
      <td>0.988000</td>
      <td>0.994011</td>
      <td>0.002574</td>
    </tr>
    <tr>
      <th>1324</th>
      <td>SK46</td>
      <td>1.0000</td>
      <td>0.993808</td>
      <td>0.993936</td>
      <td>0.000884</td>
    </tr>
  </tbody>
</table>
</div>


    Number of unique carpark numbers after filtering: 1769


Another observation we made is that many of the carparks have very sporadic or noisy time series data
- hence, we will filter out noisy data by ranking each carpark availability by the **variance of first difference**


\`\`\`python
# Group the data by carpark_number and sort by timestamp
reduced_data = day_data_df[day_data_df['carpark_number'].isin(carpark_num_reduced)].sort_values(by=['carpark_number', 'timestamp'])
# Display the grouped and sorted data
display(pd.concat([reduced_data.head(2), reduced_data.tail(2)]))

def cal_variance_of_first_difference(data_series):
    return data_series.diff().var() # Calculate the variance of the first difference of the data series

# Group the data by carpark_number and calculate the variance of the first difference for each carpark_number
carparks_data_list = {carpark_num: grouped_data.get_group(carpark_num)['occupancy_rate'].to_list() for carpark_num in carpark_num_reduced}
# Calculate the variance of the first difference for each carpark_number
variance_data = {carpark_num: cal_variance_of_first_difference(pd.Series(data)) for carpark_num, data in carparks_data_list.items()}
# Convert the variance data to a DataFrame
variance_df = pd.DataFrame(list(variance_data.items()), columns=['carpark_number', 'variance_of_first_difference'])
# Sort the DataFrame by variance_of_first_difference in ascending order
variance_df_sorted = variance_df.sort_values(by='variance_of_first_difference')
# Display the sorted DataFrame
display(pd.concat([variance_df_sorted.head(2), variance_df_sorted.tail(2)]))
print("Average variance of first difference:", variance_df_sorted['variance_of_first_difference'].mean())
\`\`\`


<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>total_lots</th>
      <th>lot_type</th>
      <th>lots_available</th>
      <th>carpark_number</th>
      <th>occupancy_rate</th>
      <th>time_update</th>
      <th>timestamp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>41448</th>
      <td>62</td>
      <td>C</td>
      <td>30</td>
      <td>A10</td>
      <td>0.483871</td>
      <td>2023-01-01 00:11</td>
      <td>2023-01-01 00:14</td>
    </tr>
    <tr>
      <th>29945</th>
      <td>62</td>
      <td>C</td>
      <td>26</td>
      <td>A10</td>
      <td>0.419355</td>
      <td>2023-01-01 00:26</td>
      <td>2023-01-01 00:29</td>
    </tr>
    <tr>
      <th>174693</th>
      <td>262</td>
      <td>C</td>
      <td>135</td>
      <td>Y9</td>
      <td>0.515267</td>
      <td>2023-01-01 23:31</td>
      <td>2023-01-01 23:29</td>
    </tr>
    <tr>
      <th>180442</th>
      <td>262</td>
      <td>C</td>
      <td>132</td>
      <td>Y9</td>
      <td>0.503817</td>
      <td>2023-01-01 23:46</td>
      <td>2023-01-01 23:44</td>
    </tr>
  </tbody>
</table>
</div>



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>carpark_number</th>
      <th>variance_of_first_difference</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>777</th>
      <td>JMB1</td>
      <td>4.394829e-08</td>
    </tr>
    <tr>
      <th>174</th>
      <td>BA8</td>
      <td>8.419126e-08</td>
    </tr>
    <tr>
      <th>1132</th>
      <td>SE12</td>
      <td>1.523924e-01</td>
    </tr>
    <tr>
      <th>61</th>
      <td>A85</td>
      <td>2.763077e-01</td>
    </tr>
  </tbody>
</table>
</div>


    Average variance of first difference: 0.0021673650415835483


We visualize the variation in the carpark availability to further narrow down which carpark is suitable for machine learning

The visualization of the 20 most varied, least varied, and average varied carpark data are as shown.


\`\`\`python
import matplotlib.pyplot as plt

num_varied_carparks_to_plot = 20
least_varied_carparks = [grouped_data.get_group(carpark_num) for carpark_num in variance_df_sorted['carpark_number'][:num_varied_carparks_to_plot]]
most_varied_carparks = [grouped_data.get_group(carpark_num) for carpark_num in variance_df_sorted['carpark_number'][-num_varied_carparks_to_plot:]]
ave_varied_carparks = [grouped_data.get_group(carpark_num) for carpark_num in variance_df_sorted['carpark_number'][len(carpark_num_reduced)//2 - num_varied_carparks_to_plot//2
                                                                                                                    :len(carpark_num_reduced)//2 + num_varied_carparks_to_plot//2]]

# Create subplots
fig, axes = plt.subplots(3, 1, figsize=(15, 10), sharex=True, sharey=True)

# Plot the least varied carparks
for df in least_varied_carparks:
    axes[0].plot(df['timestamp'], df['occupancy_rate'], label=df['carpark_number'].iloc[0])
axes[0].set_title('Least Varied Carparks')
axes[0].set_ylabel('Occupancy Rate')
axes[0].legend(loc='upper right')

# Plot the most varied carparks
for df in most_varied_carparks:
    axes[1].plot(df['timestamp'], df['occupancy_rate'], label=df['carpark_number'].iloc[0])
axes[1].set_title('Most Varied Carparks')
axes[1].set_ylabel('Occupancy Rate')
axes[1].legend(loc='upper right')

# Plot the mean varied carparks
for df in ave_varied_carparks:
    axes[2].plot(df['timestamp'], df['occupancy_rate'], label=df['carpark_number'].iloc[0])
axes[2].set_title('Average Varied Carparks')
axes[2].set_xlabel('Timestamp')
axes[2].set_ylabel('Occupancy Rate')
axes[2].legend(loc='upper right')
# Adjust layout
axes[2].tick_params(axis='x', rotation=45)
axes[2].xaxis.set_major_locator(plt.MaxNLocator(nbins=24))
plt.show()

\`\`\`


    
![png](https://github.com/CheahHaoYi/CheahHaoYi.github.io/blob/main/src/lib/data/md_project/Carpark_Availability_Prediction_files/Carpark_Availability_Prediction_24_0.png?raw=true)


With the above visualization, we decided to use the 50 carparks that are of the average varied for our ML algorithm


\`\`\`python
num_carparks = 50
selected_carparks_list = variance_df_sorted['carpark_number'][len(carpark_num_reduced)//2 - num_carparks//2:len(carpark_num_reduced)//2 + num_carparks//2].to_list()

print(f"Selected carparks:")
for i in range(0, len(selected_carparks_list), 10):
    print(*selected_carparks_list[i:i+10], sep='\\t',end='\\n')

print('\\n', selected_carparks_list)
\`\`\`

    Selected carparks:
    T48	T49	UA3	W4M	TB1	SE51	SI8	U9	SK71	JRM
    T51	PR13	PL35	PM46	T80	A73	BJ34	Y34A	KTM3	J74
    CK44	Y26	MP1M	HG98	BR11	TP53	T75	BJ18	Y27	HG76
    Y35	U38	CC11	U51	HG3D	CK38	CVBK	BBM2	SK77	K2
    T24	PL50	PL37	Y13	PM10	BA2	AH1	U55	HG70	B60
    
     ['T48', 'T49', 'UA3', 'W4M', 'TB1', 'SE51', 'SI8', 'U9', 'SK71', 'JRM', 'T51', 'PR13', 'PL35', 'PM46', 'T80', 'A73', 'BJ34', 'Y34A', 'KTM3', 'J74', 'CK44', 'Y26', 'MP1M', 'HG98', 'BR11', 'TP53', 'T75', 'BJ18', 'Y27', 'HG76', 'Y35', 'U38', 'CC11', 'U51', 'HG3D', 'CK38', 'CVBK', 'BBM2', 'SK77', 'K2', 'T24', 'PL50', 'PL37', 'Y13', 'PM10', 'BA2', 'AH1', 'U55', 'HG70', 'B60']


This section of code is fetching carpark data for a given month using concurrency to speed up the process. It then groups the data by carpark number and displays the first few rows of each dataframe.

### Description

1. **Fetching Monthly Data**: The [\`fetch_month_carpark_data\`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22vscode-notebook-cell%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fhaoyi%2FDesktop%2FEE4211%2F8_Question3.ipynb%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22X42sZmlsZQ%3D%3D%22%7D%2C%22pos%22%3A%7B%22line%22%3A6%2C%22character%22%3A4%7D%7D%5D%2C%229d1ccf86-eaae-40ff-8ec4-9fd10c468a88%22%5D "Go to definition") function fetches carpark data for each day of the specified month using concurrency to speed up the process. It uses a [\`ThreadPoolExecutor\`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22vscode-notebook-cell%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fhaoyi%2FDesktop%2FEE4211%2F8_Question3.ipynb%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22X42sZmlsZQ%3D%3D%22%7D%2C%22pos%22%3A%7B%22line%22%3A16%2C%22character%22%3A28%7D%7D%5D%2C%229d1ccf86-eaae-40ff-8ec4-9fd10c468a88%22%5D "Go to definition") to run the [\`fetch_and_process\`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22vscode-notebook-cell%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fhaoyi%2FDesktop%2FEE4211%2F8_Question3.ipynb%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22X42sZmlsZQ%3D%3D%22%7D%2C%22pos%22%3A%7B%22line%22%3A13%2C%22character%22%3A8%7D%7D%5D%2C%229d1ccf86-eaae-40ff-8ec4-9fd10c468a88%22%5D "Go to definition") function for each day in parallel.

2. **Processing Results**: The results from each day's data fetch are collected in a list. The data is concatenated into a single DataFrame, duplicates are removed, and the data is sorted by the [\`timestamp\`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fhaoyi%2FDesktop%2FEE4211%2Fjson_test.py%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A1037%2C%22character%22%3A4%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22vscode-notebook-cell%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fhaoyi%2FDesktop%2FEE4211%2F8_Question3.ipynb%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22X42sZmlsZQ%3D%3D%22%7D%2C%22pos%22%3A%7B%22line%22%3A23%2C%22character%22%3A86%7D%7D%5D%2C%229d1ccf86-eaae-40ff-8ec4-9fd10c468a88%22%5D "Go to definition") column.

3. **Grouping Data**: The fetched monthly data is grouped by [\`carpark_number\`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22vscode-notebook-cell%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fhaoyi%2FDesktop%2FEE4211%2F8_Question3.ipynb%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22X42sZmlsZQ%3D%3D%22%7D%2C%22pos%22%3A%7B%22line%22%3A28%2C%22character%22%3A20%7D%7D%2C%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fhaoyi%2FDesktop%2FEE4211%2Fgroup2_q3.ipynb%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A84%2C%22character%22%3A45%7D%7D%5D%2C%229d1ccf86-eaae-40ff-8ec4-9fd10c468a88%22%5D "Go to definition").

4. **Creating DataFrames**: A dictionary of DataFrames is created, where each key is a carpark number and the value is the corresponding DataFrame for that carpark.

5. **Displaying Data**: The first few rows of each DataFrame in the dictionary are displayed for inspection.


\`\`\`python
import concurrent.futures

# get training data
year = 2023
month = 1

def fetch_month_carpark_data(year=2023, month=1, filter_list=None):
    '''
    Fetch carpark data for a month given the year and month using concurrency
    '''
    days_in_month = 31
    data_list = []

    def fetch_and_process(day):
        return fetch_day_carpark_data(year, month, day, filter_list)

    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = [executor.submit(fetch_and_process, day) for day in range(1, days_in_month + 1)]
        for future in concurrent.futures.as_completed(futures):
            result = future.result()
            if result is not None and not result.empty:
                data_list.append(result)

    return pd.concat(data_list, ignore_index=True).drop_duplicates().sort_values(by=['timestamp'])

# Fetch data for the whole month
month_data_df = fetch_month_carpark_data(year=year, month=month,filter_list=selected_carparks_list)

# Group the data by carpark_number
grouped_month_data = month_data_df.groupby('carpark_number')

# Create a list of dataframes, one for each carpark_number
carpark_month_df_dict = {carpark_num : grouped_month_data.get_group(carpark_num) for carpark_num in selected_carparks_list}

# Display the first few rows of each dataframe in the list
for cp, df in list(carpark_month_df_dict.items())[:5]:
    print(f"Carpark number: {cp}")
    display(pd.concat([df.head(2), df.tail(2)]))

\`\`\`

    Carpark number: T48



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>total_lots</th>
      <th>lot_type</th>
      <th>lots_available</th>
      <th>carpark_number</th>
      <th>occupancy_rate</th>
      <th>time_update</th>
      <th>timestamp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>93036</th>
      <td>648</td>
      <td>C</td>
      <td>210</td>
      <td>T48</td>
      <td>0.324074</td>
      <td>2023-01-01 00:12</td>
      <td>2023-01-01 00:14</td>
    </tr>
    <tr>
      <th>93090</th>
      <td>648</td>
      <td>C</td>
      <td>205</td>
      <td>T48</td>
      <td>0.316358</td>
      <td>2023-01-01 00:27</td>
      <td>2023-01-01 00:29</td>
    </tr>
    <tr>
      <th>127657</th>
      <td>648</td>
      <td>C</td>
      <td>74</td>
      <td>T48</td>
      <td>0.114198</td>
      <td>2023-01-31 23:11</td>
      <td>2023-01-31 23:14</td>
    </tr>
    <tr>
      <th>127726</th>
      <td>648</td>
      <td>C</td>
      <td>60</td>
      <td>T48</td>
      <td>0.092593</td>
      <td>2023-01-31 23:42</td>
      <td>2023-01-31 23:44</td>
    </tr>
  </tbody>
</table>
</div>


    Carpark number: T49



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>total_lots</th>
      <th>lot_type</th>
      <th>lots_available</th>
      <th>carpark_number</th>
      <th>occupancy_rate</th>
      <th>time_update</th>
      <th>timestamp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>93033</th>
      <td>468</td>
      <td>C</td>
      <td>150</td>
      <td>T49</td>
      <td>0.320513</td>
      <td>2023-01-01 00:12</td>
      <td>2023-01-01 00:14</td>
    </tr>
    <tr>
      <th>93087</th>
      <td>468</td>
      <td>C</td>
      <td>144</td>
      <td>T49</td>
      <td>0.307692</td>
      <td>2023-01-01 00:27</td>
      <td>2023-01-01 00:29</td>
    </tr>
    <tr>
      <th>127660</th>
      <td>468</td>
      <td>C</td>
      <td>27</td>
      <td>T49</td>
      <td>0.057692</td>
      <td>2023-01-31 23:11</td>
      <td>2023-01-31 23:14</td>
    </tr>
    <tr>
      <th>127723</th>
      <td>468</td>
      <td>C</td>
      <td>28</td>
      <td>T49</td>
      <td>0.059829</td>
      <td>2023-01-31 23:41</td>
      <td>2023-01-31 23:44</td>
    </tr>
  </tbody>
</table>
</div>


    Carpark number: UA3



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>total_lots</th>
      <th>lot_type</th>
      <th>lots_available</th>
      <th>carpark_number</th>
      <th>occupancy_rate</th>
      <th>time_update</th>
      <th>timestamp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>93016</th>
      <td>245</td>
      <td>C</td>
      <td>92</td>
      <td>UA3</td>
      <td>0.375510</td>
      <td>2023-01-01 00:13</td>
      <td>2023-01-01 00:14</td>
    </tr>
    <tr>
      <th>93068</th>
      <td>245</td>
      <td>C</td>
      <td>93</td>
      <td>UA3</td>
      <td>0.379592</td>
      <td>2023-01-01 00:28</td>
      <td>2023-01-01 00:29</td>
    </tr>
    <tr>
      <th>127679</th>
      <td>245</td>
      <td>C</td>
      <td>50</td>
      <td>UA3</td>
      <td>0.204082</td>
      <td>2023-01-31 23:12</td>
      <td>2023-01-31 23:14</td>
    </tr>
    <tr>
      <th>127703</th>
      <td>245</td>
      <td>C</td>
      <td>44</td>
      <td>UA3</td>
      <td>0.179592</td>
      <td>2023-01-31 23:42</td>
      <td>2023-01-31 23:44</td>
    </tr>
  </tbody>
</table>
</div>


    Carpark number: W4M



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>total_lots</th>
      <th>lot_type</th>
      <th>lots_available</th>
      <th>carpark_number</th>
      <th>occupancy_rate</th>
      <th>time_update</th>
      <th>timestamp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>93029</th>
      <td>355</td>
      <td>C</td>
      <td>233</td>
      <td>W4M</td>
      <td>0.656338</td>
      <td>2023-01-01 00:15</td>
      <td>2023-01-01 00:14</td>
    </tr>
    <tr>
      <th>93055</th>
      <td>355</td>
      <td>C</td>
      <td>233</td>
      <td>W4M</td>
      <td>0.656338</td>
      <td>2023-01-01 00:30</td>
      <td>2023-01-01 00:29</td>
    </tr>
    <tr>
      <th>127666</th>
      <td>355</td>
      <td>C</td>
      <td>215</td>
      <td>W4M</td>
      <td>0.605634</td>
      <td>2023-01-31 23:16</td>
      <td>2023-01-31 23:14</td>
    </tr>
    <tr>
      <th>127718</th>
      <td>355</td>
      <td>C</td>
      <td>207</td>
      <td>W4M</td>
      <td>0.583099</td>
      <td>2023-01-31 23:46</td>
      <td>2023-01-31 23:44</td>
    </tr>
  </tbody>
</table>
</div>


    Carpark number: TB1



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>total_lots</th>
      <th>lot_type</th>
      <th>lots_available</th>
      <th>carpark_number</th>
      <th>occupancy_rate</th>
      <th>time_update</th>
      <th>timestamp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>93026</th>
      <td>58</td>
      <td>C</td>
      <td>2</td>
      <td>TB1</td>
      <td>0.034483</td>
      <td>2023-01-01 00:04</td>
      <td>2023-01-01 00:14</td>
    </tr>
    <tr>
      <th>93069</th>
      <td>58</td>
      <td>C</td>
      <td>2</td>
      <td>TB1</td>
      <td>0.034483</td>
      <td>2023-01-01 00:20</td>
      <td>2023-01-01 00:29</td>
    </tr>
    <tr>
      <th>127678</th>
      <td>58</td>
      <td>C</td>
      <td>6</td>
      <td>TB1</td>
      <td>0.103448</td>
      <td>2023-01-31 23:06</td>
      <td>2023-01-31 23:14</td>
    </tr>
    <tr>
      <th>127704</th>
      <td>58</td>
      <td>C</td>
      <td>6</td>
      <td>TB1</td>
      <td>0.103448</td>
      <td>2023-01-31 23:35</td>
      <td>2023-01-31 23:44</td>
    </tr>
  </tbody>
</table>
</div>



\`\`\`python
import os
year = 2023
month = 1
folder_path = 'data/'
folder_training_data_path = folder_path + 'training_data/'
os.makedirs(folder_path, exist_ok=True)
os.makedirs(folder_training_data_path, exist_ok=True)

# Save the each CP data to a CSV file separately
for cp, df in carpark_month_df_dict.items():
    df.to_csv(folder_training_data_path + f'carpark_{cp}_{year}_{month}.csv', index=False)
\`\`\`


\`\`\`python
year = 2024
month = 1
# Fetch testing (first half of the month) and forecasting data (second half of the month)
month_data_df = fetch_month_carpark_data(year=year, month=month,filter_list=selected_carparks_list)

# Split the data into testing and forecasting data
midpoint = len(month_data_df) // 2
testing_data = month_data_df.iloc[:midpoint]
forecasting_data = month_data_df.iloc[midpoint:]

# Group the data by carpark_number
grouped_testing_data = testing_data.groupby('carpark_number')
grouped_forecasting_data = forecasting_data.groupby('carpark_number')


# Create a list of dataframes, one for each carpark_number
carpark_testing_df_dict = {carpark_num : grouped_testing_data.get_group(carpark_num) for carpark_num in selected_carparks_list}
carpark_forecasting_df_dict = {carpark_num : grouped_forecasting_data.get_group(carpark_num) for carpark_num in selected_carparks_list}
\`\`\`


\`\`\`python
import os
year = 2024
month = 1
folder_path = 'data/'
folder_testing_data_path = folder_path + 'testing_data/'
folder_forecasting_data_path = folder_path + 'forecasting_data/'

os.makedirs(folder_testing_data_path, exist_ok=True)
os.makedirs(folder_forecasting_data_path, exist_ok=True)

# Save the each CP data to a CSV file separately
for cp, df in carpark_testing_df_dict.items():
    df.to_csv(folder_testing_data_path + f'carpark_{cp}_{year}_{month}.csv', index=False)

for cp, df in carpark_forecasting_df_dict.items():
    df.to_csv(folder_forecasting_data_path + f'carpark_{cp}_{year}_{month}.csv', index=False)
\`\`\`

We get the HDB carpark information need to investigate the relationship between the carpark properties and the general availability of the carpark


\`\`\`python
import requests
import pandas as pd
import json
import time

HDB_CARPARK_DATASET_ID = "d_23f946fa557947f93a8043bbef41dd09"

def get_dataset_data(dataset_id):
    s = requests.Session()
    s.headers.update({'referer': 'https://colab.research.google.com'})
    base_url = "https://api-production.data.gov.sg"
    url = base_url + f"/v2/public/api/datasets/{dataset_id}/metadata"
    response = s.get(url)
    data = response.json()['data']
    # columnMetadata = data.pop('columnMetadata', None)
    # print("Dataset Metadata:")
    # print(json.dumps(data, indent=2))
    # print("\\nColumns:\\n", list(columnMetadata['map'].values()))
    def download_file(dataset_id):
        initiate_download_response = s.get( # initiate download
            f"https://api-open.data.gov.sg/v1/public/api/datasets/{dataset_id}/initiate-download",
            headers={"Content-Type":"application/json"}, json={})
        print(initiate_download_response.json()['data']['message'])
        MAX_POLLS = 5
        for i in range(MAX_POLLS): # poll download
            poll_download_response = s.get(
                f"https://api-open.data.gov.sg/v1/public/api/datasets/{dataset_id}/poll-download",
                headers={"Content-Type":"application/json"}, json={})
            if "url" in poll_download_response.json()['data']:
                # print(poll_download_response.json()['data']['url'])
                DOWNLOAD_URL = poll_download_response.json()['data']['url']
                df = pd.read_csv(DOWNLOAD_URL)
                print("Download successful!")
                return df
            if i == MAX_POLLS - 1:
                print(f"{i+1}/{MAX_POLLS}: No result found, possible error with dataset, please try again or let us know at https://go.gov.sg/datagov-supportform\\n")
            else:
                print(f"{i+1}/{MAX_POLLS}: No result yet, continuing to poll\\n")
            time.sleep(3)
    return download_file(dataset_id)
\`\`\`


\`\`\`python
carpark_info_df = get_dataset_data(HDB_CARPARK_DATASET_ID)
carpark_info_df.set_index('car_park_no', inplace=True)
carpark_info_df = carpark_info_df[carpark_info_df.index.isin(selected_carparks_list)]

display(carpark_info_df.head(3))
print(carpark_info_df.shape)
\`\`\`

    Download successfully initiated. Proceed to poll download
    Download successful!



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>address</th>
      <th>x_coord</th>
      <th>y_coord</th>
      <th>car_park_type</th>
      <th>type_of_parking_system</th>
      <th>short_term_parking</th>
      <th>free_parking</th>
      <th>night_parking</th>
      <th>car_park_decks</th>
      <th>gantry_height</th>
      <th>car_park_basement</th>
    </tr>
    <tr>
      <th>car_park_no</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>AH1</th>
      <td>BLK 101 JALAN DUSUN</td>
      <td>29257.7203</td>
      <td>34500.3599</td>
      <td>SURFACE CAR PARK</td>
      <td>ELECTRONIC PARKING</td>
      <td>WHOLE DAY</td>
      <td>SUN &amp; PH FR 7AM-10.30PM</td>
      <td>YES</td>
      <td>0</td>
      <td>0.00</td>
      <td>N</td>
    </tr>
    <tr>
      <th>A73</th>
      <td>BLK 641/645 ANG MO KIO STREET 61</td>
      <td>28835.3369</td>
      <td>40091.5441</td>
      <td>SURFACE CAR PARK</td>
      <td>ELECTRONIC PARKING</td>
      <td>WHOLE DAY</td>
      <td>SUN &amp; PH FR 7AM-10.30PM</td>
      <td>YES</td>
      <td>0</td>
      <td>0.00</td>
      <td>N</td>
    </tr>
    <tr>
      <th>BA2</th>
      <td>BLK 117 ALKAFF CRESCENT</td>
      <td>32444.5217</td>
      <td>35453.6678</td>
      <td>MULTI-STOREY CAR PARK</td>
      <td>ELECTRONIC PARKING</td>
      <td>WHOLE DAY</td>
      <td>SUN &amp; PH FR 7AM-10.30PM</td>
      <td>YES</td>
      <td>8</td>
      <td>2.15</td>
      <td>N</td>
    </tr>
  </tbody>
</table>
</div>


    (50, 11)


Again, we use concurrency to process the HDB carpark data to obtain the longitude and latitude


\`\`\`python
import requests
import pandas as pd
import json
import concurrent.futures

def convert_svy21_to_wgs84(x, y):
    # Set the ArcGIS API endpoint and the spatial reference system codes for conversion
    url = "http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer/project"
    inSR = "3414"  # Input spatial reference (Singapore TM)
    outSR = "4326" # Output spatial reference (WGS84)
    # Construct the request payload for ArcGIS API
    geometries = {
        "geometryType": "esriGeometryPoint",
        "geometries": [{"x": x, "y": y}]
    }
    params = { "inSR": inSR, "outSR": outSR,
        "geometries": json.dumps(geometries), "f": "pjson" }

    response = requests.get(url, params=params)
    if response.status_code == 200:
        content = response.json()
        try:
            latitude = content['geometries'][0]['y']
            longitude = content['geometries'][0]['x']
            return (longitude, latitude)
        except (KeyError, IndexError):
            print(f"Error in response for coordinates ({x}, {y})")
    return (None, None)

# Initialize lists to store latitude and longitude results
latitudes = []
longitudes = []

def fetch_lat_lon(row):
    X, Y = row["x_coord"], row["y_coord"]
    lon, lat = convert_svy21_to_wgs84(X, Y)
    return lat, lon

# Use ThreadPoolExecutor for concurrency
with concurrent.futures.ThreadPoolExecutor() as executor:
    results = list(executor.map(fetch_lat_lon, [row for _, row in carpark_info_df.iterrows()]))

# Unpack the results into latitudes and longitudes lists
latitudes, longitudes = zip(*results)

# Add latitude and longitude columns to the DataFrame
carpark_info_df['latitude'] = latitudes
carpark_info_df['longitude'] = longitudes
display(carpark_info_df.head())
\`\`\`


<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>address</th>
      <th>x_coord</th>
      <th>y_coord</th>
      <th>car_park_type</th>
      <th>type_of_parking_system</th>
      <th>short_term_parking</th>
      <th>free_parking</th>
      <th>night_parking</th>
      <th>car_park_decks</th>
      <th>gantry_height</th>
      <th>car_park_basement</th>
      <th>latitude</th>
      <th>longitude</th>
    </tr>
    <tr>
      <th>car_park_no</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>AH1</th>
      <td>BLK 101 JALAN DUSUN</td>
      <td>29257.7203</td>
      <td>34500.3599</td>
      <td>SURFACE CAR PARK</td>
      <td>ELECTRONIC PARKING</td>
      <td>WHOLE DAY</td>
      <td>SUN &amp; PH FR 7AM-10.30PM</td>
      <td>YES</td>
      <td>0</td>
      <td>0.00</td>
      <td>N</td>
      <td>1.328283</td>
      <td>103.844620</td>
    </tr>
    <tr>
      <th>A73</th>
      <td>BLK 641/645 ANG MO KIO STREET 61</td>
      <td>28835.3369</td>
      <td>40091.5441</td>
      <td>SURFACE CAR PARK</td>
      <td>ELECTRONIC PARKING</td>
      <td>WHOLE DAY</td>
      <td>SUN &amp; PH FR 7AM-10.30PM</td>
      <td>YES</td>
      <td>0</td>
      <td>0.00</td>
      <td>N</td>
      <td>1.378848</td>
      <td>103.840825</td>
    </tr>
    <tr>
      <th>BA2</th>
      <td>BLK 117 ALKAFF CRESCENT</td>
      <td>32444.5217</td>
      <td>35453.6678</td>
      <td>MULTI-STOREY CAR PARK</td>
      <td>ELECTRONIC PARKING</td>
      <td>WHOLE DAY</td>
      <td>SUN &amp; PH FR 7AM-10.30PM</td>
      <td>YES</td>
      <td>8</td>
      <td>2.15</td>
      <td>N</td>
      <td>1.336905</td>
      <td>103.873255</td>
    </tr>
    <tr>
      <th>BBM2</th>
      <td>BLK 628A BUKIT BATOK CENTRAL</td>
      <td>18714.4710</td>
      <td>36997.6927</td>
      <td>MULTI-STOREY CAR PARK</td>
      <td>ELECTRONIC PARKING</td>
      <td>WHOLE DAY</td>
      <td>SUN &amp; PH FR 7AM-10.30PM</td>
      <td>YES</td>
      <td>11</td>
      <td>2.15</td>
      <td>N</td>
      <td>1.350867</td>
      <td>103.749882</td>
    </tr>
    <tr>
      <th>BJ18</th>
      <td>BLK 401-408 FAJAR ROAD</td>
      <td>20743.2768</td>
      <td>40326.2581</td>
      <td>SURFACE CAR PARK</td>
      <td>ELECTRONIC PARKING</td>
      <td>WHOLE DAY</td>
      <td>SUN &amp; PH FR 7AM-10.30PM</td>
      <td>YES</td>
      <td>0</td>
      <td>5.40</td>
      <td>N</td>
      <td>1.380970</td>
      <td>103.768112</td>
    </tr>
  </tbody>
</table>
</div>



\`\`\`python
# save additional carpark info to csv
folder_path = 'data/'
carpark_info_df.to_csv(folder_path + 'carpark_info.csv')
\`\`\`

Here, we obtain the 24 hour weather forecast data, including values such as the temperature, humidity and wind speed to assist in our investigation into carpark availability


\`\`\`python
import requests
import json
import pandas as pd
from IPython.display import display

timestamp_format = '%Y-%m-%d %H:%M'

def fetch_weather_data(year=2024, month=1, day=1):
  '''
  Fetch weather data from the API given the year, month, and day
  '''
  date_str = f'{year}-{str(month).zfill(2)}-{str(day).zfill(2)}'
  site = f'https://api-open.data.gov.sg/v2/real-time/api/twenty-four-hr-forecast?date={date_str}'
  data = json.loads(requests.get(site).text)
  return data["data"]

def parse_weather_data(weather_data):
  if weather_data is None:
    return None

  records = weather_data["records"]
  data = []

  for record in records:
    timestamp = record["timestamp"]
    general = record["general"]
    temperature = general["temperature"]
    relative_humidity = general["relativeHumidity"]
    wind = general["wind"]

    for period in record["periods"]:
      time_period = period["timePeriod"]
      row = {
        # "timestamp": timestamp,
        "timestamp": time_period["start"],
        "time_end": time_period["end"],
        "time_period_text": time_period["text"],
        "temperature_low": temperature["low"],
        "temperature_high": temperature["high"],
        "temperature_unit": temperature["unit"],
        "relative_humidity_low": relative_humidity["low"],
        "relative_humidity_high": relative_humidity["high"],
        "relative_humidity_unit": relative_humidity["unit"],
        "wind_speed_low": wind["speed"]["low"],
        "wind_speed_high": wind["speed"]["high"],
        "wind_direction": wind["direction"]
      }

      for region, details in period["regions"].items():
        row[f"{region}_forecast_code"] = details["code"]
        row[f"{region}_forecast_text"] = details["text"]

      data.append(row)

  df = pd.DataFrame(data)
  df['timestamp'] = pd.to_datetime(df['timestamp']).dt.strftime(timestamp_format)
  df['time_end'] = pd.to_datetime(df['time_end']).dt.strftime(timestamp_format)

  df.set_index("timestamp", inplace=True)
  df.sort_index(inplace=True)
  return df[~df.index.duplicated(keep='first')]

weather_data = fetch_weather_data(2024, 1)
weather_df = parse_weather_data(weather_data)
display(pd.concat([weather_df.head(2), weather_df.tail(2)]))

\`\`\`


<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>time_end</th>
      <th>time_period_text</th>
      <th>temperature_low</th>
      <th>temperature_high</th>
      <th>temperature_unit</th>
      <th>relative_humidity_low</th>
      <th>relative_humidity_high</th>
      <th>relative_humidity_unit</th>
      <th>wind_speed_low</th>
      <th>wind_speed_high</th>
      <th>...</th>
      <th>west_forecast_code</th>
      <th>west_forecast_text</th>
      <th>east_forecast_code</th>
      <th>east_forecast_text</th>
      <th>central_forecast_code</th>
      <th>central_forecast_text</th>
      <th>south_forecast_code</th>
      <th>south_forecast_text</th>
      <th>north_forecast_code</th>
      <th>north_forecast_text</th>
    </tr>
    <tr>
      <th>timestamp</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2023-01-01 06:00</th>
      <td>2023-01-01 12:00</td>
      <td>6 am to Midday 01 Jan</td>
      <td>24</td>
      <td>31</td>
      <td>Degrees Celsius</td>
      <td>65</td>
      <td>95</td>
      <td>Percentage</td>
      <td>10</td>
      <td>20</td>
      <td>...</td>
      <td>SH</td>
      <td>Showers</td>
      <td>SH</td>
      <td>Showers</td>
      <td>SH</td>
      <td>Showers</td>
      <td>SH</td>
      <td>Showers</td>
      <td>SH</td>
      <td>Showers</td>
    </tr>
    <tr>
      <th>2023-01-01 12:00</th>
      <td>2023-01-01 18:00</td>
      <td>Midday to 6 pm 01 Jan</td>
      <td>24</td>
      <td>31</td>
      <td>Degrees Celsius</td>
      <td>65</td>
      <td>95</td>
      <td>Percentage</td>
      <td>10</td>
      <td>20</td>
      <td>...</td>
      <td>TL</td>
      <td>Thundery Showers</td>
      <td>TL</td>
      <td>Thundery Showers</td>
      <td>TL</td>
      <td>Thundery Showers</td>
      <td>TL</td>
      <td>Thundery Showers</td>
      <td>TL</td>
      <td>Thundery Showers</td>
    </tr>
    <tr>
      <th>2024-01-02 12:00</th>
      <td>2024-01-02 18:00</td>
      <td>Midday to 6 pm 02 Jan</td>
      <td>24</td>
      <td>33</td>
      <td>Degrees Celsius</td>
      <td>65</td>
      <td>95</td>
      <td>Percentage</td>
      <td>10</td>
      <td>20</td>
      <td>...</td>
      <td>TL</td>
      <td>Thundery Showers</td>
      <td>TL</td>
      <td>Thundery Showers</td>
      <td>TL</td>
      <td>Thundery Showers</td>
      <td>TL</td>
      <td>Thundery Showers</td>
      <td>TL</td>
      <td>Thundery Showers</td>
    </tr>
    <tr>
      <th>2024-01-02 18:00</th>
      <td>2024-01-03 00:00</td>
      <td>6 pm to Midnight 02 Jan</td>
      <td>24</td>
      <td>33</td>
      <td>Degrees Celsius</td>
      <td>65</td>
      <td>95</td>
      <td>Percentage</td>
      <td>10</td>
      <td>20</td>
      <td>...</td>
      <td>CL</td>
      <td>Cloudy</td>
      <td>CL</td>
      <td>Cloudy</td>
      <td>CL</td>
      <td>Cloudy</td>
      <td>CL</td>
      <td>Cloudy</td>
      <td>CL</td>
      <td>Cloudy</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 21 columns</p>
</div>



\`\`\`python
import concurrent.futures

def fetch_day_weather_data(year, month, day):
    weather_data = fetch_weather_data(year, month, day)
    return parse_weather_data(weather_data)

def fetch_month_weather_data(year, month):
    days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]
    data_list = []

    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = [executor.submit(fetch_day_weather_data, year, month, day) for day in range(1, days_in_month)]
        for future in concurrent.futures.as_completed(futures):
            result = future.result()
            if result is not None and not result.empty:
                data_list.append(result)

    weather_month_data = pd.concat(data_list).sort_index()

    weather_month_data['average_temperature'] = (weather_month_data['temperature_low'] + weather_month_data['temperature_high']) / 2
    weather_month_data['average_relative_humidity'] = (weather_month_data['relative_humidity_low'] + weather_month_data['relative_humidity_high']) / 2
    weather_month_data['average_wind_speed'] = (weather_month_data['wind_speed_low'] + weather_month_data['wind_speed_high']) / 2

    return weather_month_data

# Fetch training data
training_weather_month_df = fetch_month_weather_data(2023, 1)

testing_weather_month_df = fetch_month_weather_data(2024, 1)
forecasting_weather_month_df = testing_weather_month_df.iloc[len(testing_weather_month_df) // 2:]
testing_weather_month_df = testing_weather_month_df.iloc[:len(testing_weather_month_df) // 2]


display(pd.concat([training_weather_month_df.head(2), training_weather_month_df.tail(2)]))
print(training_weather_month_df.shape)
display(training_weather_month_df.describe())
\`\`\`


<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>time_end</th>
      <th>time_period_text</th>
      <th>temperature_low</th>
      <th>temperature_high</th>
      <th>temperature_unit</th>
      <th>relative_humidity_low</th>
      <th>relative_humidity_high</th>
      <th>relative_humidity_unit</th>
      <th>wind_speed_low</th>
      <th>wind_speed_high</th>
      <th>...</th>
      <th>east_forecast_text</th>
      <th>central_forecast_code</th>
      <th>central_forecast_text</th>
      <th>south_forecast_code</th>
      <th>south_forecast_text</th>
      <th>north_forecast_code</th>
      <th>north_forecast_text</th>
      <th>average_temperature</th>
      <th>average_relative_humidity</th>
      <th>average_wind_speed</th>
    </tr>
    <tr>
      <th>timestamp</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2022-01-01 06:00</th>
      <td>2022-01-01 12:00</td>
      <td>6 am to Midday 1 Jan</td>
      <td>24</td>
      <td>33</td>
      <td>Degrees Celsius</td>
      <td>55</td>
      <td>90</td>
      <td>Percentage</td>
      <td>15</td>
      <td>30</td>
      <td>...</td>
      <td>Windy</td>
      <td>WD</td>
      <td>Windy</td>
      <td>WD</td>
      <td>Windy</td>
      <td>WD</td>
      <td>Windy</td>
      <td>28.5</td>
      <td>72.5</td>
      <td>22.5</td>
    </tr>
    <tr>
      <th>2022-01-01 12:00</th>
      <td>2022-01-01 18:00</td>
      <td>Midday to 6 pm 1 Jan</td>
      <td>24</td>
      <td>33</td>
      <td>Degrees Celsius</td>
      <td>55</td>
      <td>90</td>
      <td>Percentage</td>
      <td>15</td>
      <td>30</td>
      <td>...</td>
      <td>Windy</td>
      <td>WD</td>
      <td>Windy</td>
      <td>WD</td>
      <td>Windy</td>
      <td>WD</td>
      <td>Windy</td>
      <td>28.5</td>
      <td>72.5</td>
      <td>22.5</td>
    </tr>
    <tr>
      <th>2023-01-31 12:00</th>
      <td>2023-01-31 18:00</td>
      <td>Midday to 6 pm 31 Jan</td>
      <td>23</td>
      <td>31</td>
      <td>Degrees Celsius</td>
      <td>60</td>
      <td>95</td>
      <td>Percentage</td>
      <td>15</td>
      <td>25</td>
      <td>...</td>
      <td>Showers</td>
      <td>SH</td>
      <td>Showers</td>
      <td>SH</td>
      <td>Showers</td>
      <td>SH</td>
      <td>Showers</td>
      <td>27.0</td>
      <td>77.5</td>
      <td>20.0</td>
    </tr>
    <tr>
      <th>2023-01-31 18:00</th>
      <td>2023-02-01 00:00</td>
      <td>6 pm to Midnight 31 Jan</td>
      <td>23</td>
      <td>31</td>
      <td>Degrees Celsius</td>
      <td>60</td>
      <td>95</td>
      <td>Percentage</td>
      <td>15</td>
      <td>25</td>
      <td>...</td>
      <td>Partly Cloudy (Night)</td>
      <td>PN</td>
      <td>Partly Cloudy (Night)</td>
      <td>PN</td>
      <td>Partly Cloudy (Night)</td>
      <td>PN</td>
      <td>Partly Cloudy (Night)</td>
      <td>27.0</td>
      <td>77.5</td>
      <td>20.0</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 24 columns</p>
</div>


    (154, 24)



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>temperature_low</th>
      <th>temperature_high</th>
      <th>relative_humidity_low</th>
      <th>relative_humidity_high</th>
      <th>wind_speed_low</th>
      <th>wind_speed_high</th>
      <th>average_temperature</th>
      <th>average_relative_humidity</th>
      <th>average_wind_speed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>154.000000</td>
      <td>154.000000</td>
      <td>154.000000</td>
      <td>154.000000</td>
      <td>154.000000</td>
      <td>154.000000</td>
      <td>154.000000</td>
      <td>154.000000</td>
      <td>154.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>23.051948</td>
      <td>31.623377</td>
      <td>62.077922</td>
      <td>95.779221</td>
      <td>11.525974</td>
      <td>22.142857</td>
      <td>27.337662</td>
      <td>78.928571</td>
      <td>16.834416</td>
    </tr>
    <tr>
      <th>std</th>
      <td>0.602741</td>
      <td>2.016526</td>
      <td>5.736630</td>
      <td>2.071426</td>
      <td>5.059383</td>
      <td>6.284568</td>
      <td>1.225923</td>
      <td>3.692170</td>
      <td>5.528020</td>
    </tr>
    <tr>
      <th>min</th>
      <td>22.000000</td>
      <td>26.000000</td>
      <td>55.000000</td>
      <td>90.000000</td>
      <td>5.000000</td>
      <td>15.000000</td>
      <td>24.000000</td>
      <td>72.500000</td>
      <td>10.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>23.000000</td>
      <td>31.000000</td>
      <td>60.000000</td>
      <td>95.000000</td>
      <td>5.000000</td>
      <td>15.000000</td>
      <td>27.000000</td>
      <td>77.500000</td>
      <td>12.500000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>23.000000</td>
      <td>33.000000</td>
      <td>60.000000</td>
      <td>95.000000</td>
      <td>10.000000</td>
      <td>20.000000</td>
      <td>28.000000</td>
      <td>77.500000</td>
      <td>15.000000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>23.000000</td>
      <td>33.000000</td>
      <td>65.000000</td>
      <td>95.000000</td>
      <td>15.000000</td>
      <td>30.000000</td>
      <td>28.000000</td>
      <td>80.000000</td>
      <td>22.500000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>24.000000</td>
      <td>34.000000</td>
      <td>80.000000</td>
      <td>100.000000</td>
      <td>20.000000</td>
      <td>35.000000</td>
      <td>29.000000</td>
      <td>90.000000</td>
      <td>27.500000</td>
    </tr>
  </tbody>
</table>
</div>



\`\`\`python
# Define the folder path and file name
folder_path = 'data/'
folder_training_data_path = folder_path + 'training_data/'
folder_testing_data_path = folder_path + 'testing_data/'
folder_forecasting_data_path = folder_path + 'forecasting_data/'

train_year = 2023
train_month = 1
test_year = 2024
test_month = 1
forecasting_year = 2024
forecasting_month = 1

# Save the weather data to a CSV file
testing_weather_month_df.to_csv(folder_testing_data_path + f'weather_{test_year}_{test_month}.csv')
forecasting_weather_month_df.to_csv(folder_forecasting_data_path + f'weather_{forecasting_year}_{forecasting_month}.csv')
training_weather_month_df.to_csv(folder_training_data_path + f'weather_{train_year}_{train_month}.csv')
\`\`\`

Here, we load the data from CSV for analysis


\`\`\`python
import os
import pandas as pd

data_folder = 'data/'
training_data_folder = data_folder + 'training_data/'
testing_data_folder = data_folder + 'testing_data/'
forecasting_data_folder = data_folder + 'forecasting_data/'

training_carpark_data_dict = {}
testing_carpark_data_dict = {}
forecasting_carpark_data_dict = {}

training_weather_data = None
testing_weather_data = None
forecasting_weather_data = None

selected_carparks_set = set()

for file in os.listdir(training_data_folder):
    if file.endswith('.csv') and file.startswith('carpark'):
        carpark_name = file.split('_')[1]
        training_carpark_data_dict[carpark_name] = pd.read_csv(training_data_folder + file)
        selected_carparks_set.add(carpark_name)
    elif file.endswith('.csv') and file.startswith('weather'):
        training_weather_data = pd.read_csv(training_data_folder + file)

for file in os.listdir(testing_data_folder):
    if file.endswith('.csv') and file.startswith('carpark'):
        carpark_name = file.split('_')[1]
        testing_carpark_data_dict[carpark_name] = pd.read_csv(testing_data_folder + file)
        selected_carparks_set.add(carpark_name)
    elif file.endswith('.csv') and file.startswith('weather'):
        testing_weather_data = pd.read_csv(testing_data_folder + file)

for file in os.listdir(forecasting_data_folder):
    if file.endswith('.csv') and file.startswith('carpark'):
        carpark_name = file.split('_')[1]
        forecasting_carpark_data_dict[carpark_name] = pd.read_csv(forecasting_data_folder + file)
        selected_carparks_set.add(carpark_name)
    elif file.endswith('.csv') and file.startswith('weather'):
        forecasting_weather_data = pd.read_csv(forecasting_data_folder + file)

\`\`\`


\`\`\`python
from IPython.display import display

print("Selected carparks", selected_carparks_set)
print("Display the first few rows of the training data")
for df in list(training_carpark_data_dict.values())[:2]:
    display(pd.concat([df.head(2), df.tail(2)]))

print("Display the first few rows of the testing data")
for df in list(testing_carpark_data_dict.values())[:2]:
    display(pd.concat([df.head(2), df.tail(2)]))

print("Display the first few rows of the forecasting data")
for df in list(forecasting_carpark_data_dict.values())[:2]:
    display(pd.concat([df.head(2), df.tail(2)]))

print("Display the first few rows of the training, testing and forecasting weather data")
display(pd.concat([training_weather_data.head(2), training_weather_data.tail(2)]))
display(pd.concat([testing_weather_data.head(2), testing_weather_data.tail(2)]))
display(pd.concat([forecasting_weather_data.head(2), forecasting_weather_data.tail(2)]))
\`\`\`

    Selected carparks {'Y34A', 'BA2', 'AH1', 'U9', 'T51', 'KTM3', 'B60', 'U38', 'SK71', 'MP1M', 'PM10', 'CC11', 'SE51', 'UA3', 'PR13', 'A73', 'U55', 'TB1', 'BJ18', 'Y27', 'Y35', 'BBM2', 'T80', 'PM46', 'T24', 'CK38', 'HG3D', 'CK44', 'HG70', 'T48', 'SK77', 'CVBK', 'T49', 'W4M', 'BJ34', 'U51', 'TP53', 'BR11', 'JRM', 'J74', 'PL37', 'T75', 'K2', 'Y26', 'PL50', 'HG98', 'HG76', 'SI8', 'PL35', 'Y13'}
    Display the first few rows of the training data



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>total_lots</th>
      <th>lot_type</th>
      <th>lots_available</th>
      <th>carpark_number</th>
      <th>occupancy_rate</th>
      <th>time_update</th>
      <th>timestamp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>231</td>
      <td>C</td>
      <td>88</td>
      <td>T75</td>
      <td>0.380952</td>
      <td>2023-01-01 00:12</td>
      <td>2023-01-01 00:14</td>
    </tr>
    <tr>
      <th>1</th>
      <td>231</td>
      <td>C</td>
      <td>85</td>
      <td>T75</td>
      <td>0.367965</td>
      <td>2023-01-01 00:27</td>
      <td>2023-01-01 00:29</td>
    </tr>
    <tr>
      <th>2551</th>
      <td>231</td>
      <td>C</td>
      <td>58</td>
      <td>T75</td>
      <td>0.251082</td>
      <td>2023-01-31 23:11</td>
      <td>2023-01-31 23:14</td>
    </tr>
    <tr>
      <th>2552</th>
      <td>231</td>
      <td>C</td>
      <td>50</td>
      <td>T75</td>
      <td>0.216450</td>
      <td>2023-01-31 23:41</td>
      <td>2023-01-31 23:44</td>
    </tr>
  </tbody>
</table>
</div>



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>total_lots</th>
      <th>lot_type</th>
      <th>lots_available</th>
      <th>carpark_number</th>
      <th>occupancy_rate</th>
      <th>time_update</th>
      <th>timestamp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>414</td>
      <td>C</td>
      <td>200</td>
      <td>A73</td>
      <td>0.483092</td>
      <td>2023-01-01 00:11</td>
      <td>2023-01-01 00:14</td>
    </tr>
    <tr>
      <th>1</th>
      <td>414</td>
      <td>C</td>
      <td>204</td>
      <td>A73</td>
      <td>0.492754</td>
      <td>2023-01-01 00:26</td>
      <td>2023-01-01 00:29</td>
    </tr>
    <tr>
      <th>2551</th>
      <td>414</td>
      <td>C</td>
      <td>157</td>
      <td>A73</td>
      <td>0.379227</td>
      <td>2023-01-31 23:11</td>
      <td>2023-01-31 23:14</td>
    </tr>
    <tr>
      <th>2552</th>
      <td>414</td>
      <td>C</td>
      <td>147</td>
      <td>A73</td>
      <td>0.355072</td>
      <td>2023-01-31 23:41</td>
      <td>2023-01-31 23:44</td>
    </tr>
  </tbody>
</table>
</div>


    Display the first few rows of the testing data



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>total_lots</th>
      <th>lot_type</th>
      <th>lots_available</th>
      <th>carpark_number</th>
      <th>occupancy_rate</th>
      <th>time_update</th>
      <th>timestamp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>522</td>
      <td>C</td>
      <td>299</td>
      <td>MP1M</td>
      <td>0.572797</td>
      <td>2024-01-01 00:09</td>
      <td>2024-01-01 00:14</td>
    </tr>
    <tr>
      <th>1</th>
      <td>522</td>
      <td>C</td>
      <td>304</td>
      <td>MP1M</td>
      <td>0.582375</td>
      <td>2024-01-01 00:28</td>
      <td>2024-01-01 00:29</td>
    </tr>
    <tr>
      <th>1087</th>
      <td>522</td>
      <td>C</td>
      <td>275</td>
      <td>MP1M</td>
      <td>0.526820</td>
      <td>2024-01-13 01:26</td>
      <td>2024-01-13 01:29</td>
    </tr>
    <tr>
      <th>1088</th>
      <td>522</td>
      <td>C</td>
      <td>273</td>
      <td>MP1M</td>
      <td>0.522989</td>
      <td>2024-01-13 01:40</td>
      <td>2024-01-13 01:44</td>
    </tr>
  </tbody>
</table>
</div>



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>total_lots</th>
      <th>lot_type</th>
      <th>lots_available</th>
      <th>carpark_number</th>
      <th>occupancy_rate</th>
      <th>time_update</th>
      <th>timestamp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>268</td>
      <td>C</td>
      <td>125</td>
      <td>BR11</td>
      <td>0.466418</td>
      <td>2024-01-01 00:13</td>
      <td>2024-01-01 00:14</td>
    </tr>
    <tr>
      <th>1</th>
      <td>268</td>
      <td>C</td>
      <td>125</td>
      <td>BR11</td>
      <td>0.466418</td>
      <td>2024-01-01 00:29</td>
      <td>2024-01-01 00:29</td>
    </tr>
    <tr>
      <th>1087</th>
      <td>268</td>
      <td>C</td>
      <td>114</td>
      <td>BR11</td>
      <td>0.425373</td>
      <td>2024-01-13 01:28</td>
      <td>2024-01-13 01:29</td>
    </tr>
    <tr>
      <th>1088</th>
      <td>268</td>
      <td>C</td>
      <td>112</td>
      <td>BR11</td>
      <td>0.417910</td>
      <td>2024-01-13 01:43</td>
      <td>2024-01-13 01:44</td>
    </tr>
  </tbody>
</table>
</div>


    Display the first few rows of the forecasting data



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>total_lots</th>
      <th>lot_type</th>
      <th>lots_available</th>
      <th>carpark_number</th>
      <th>occupancy_rate</th>
      <th>time_update</th>
      <th>timestamp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>522</td>
      <td>C</td>
      <td>271</td>
      <td>MP1M</td>
      <td>0.519157</td>
      <td>2024-01-13 01:57</td>
      <td>2024-01-13 01:59</td>
    </tr>
    <tr>
      <th>1</th>
      <td>522</td>
      <td>C</td>
      <td>272</td>
      <td>MP1M</td>
      <td>0.521073</td>
      <td>2024-01-13 02:12</td>
      <td>2024-01-13 02:14</td>
    </tr>
    <tr>
      <th>1087</th>
      <td>522</td>
      <td>C</td>
      <td>304</td>
      <td>MP1M</td>
      <td>0.582375</td>
      <td>2024-01-31 22:13</td>
      <td>2024-01-31 22:14</td>
    </tr>
    <tr>
      <th>1088</th>
      <td>522</td>
      <td>C</td>
      <td>286</td>
      <td>MP1M</td>
      <td>0.547893</td>
      <td>2024-01-31 23:42</td>
      <td>2024-01-31 23:44</td>
    </tr>
  </tbody>
</table>
</div>



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>total_lots</th>
      <th>lot_type</th>
      <th>lots_available</th>
      <th>carpark_number</th>
      <th>occupancy_rate</th>
      <th>time_update</th>
      <th>timestamp</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>268</td>
      <td>C</td>
      <td>113</td>
      <td>BR11</td>
      <td>0.421642</td>
      <td>2024-01-13 01:58</td>
      <td>2024-01-13 01:59</td>
    </tr>
    <tr>
      <th>1</th>
      <td>268</td>
      <td>C</td>
      <td>113</td>
      <td>BR11</td>
      <td>0.421642</td>
      <td>2024-01-13 02:13</td>
      <td>2024-01-13 02:14</td>
    </tr>
    <tr>
      <th>1087</th>
      <td>268</td>
      <td>C</td>
      <td>117</td>
      <td>BR11</td>
      <td>0.436567</td>
      <td>2024-01-31 22:13</td>
      <td>2024-01-31 22:14</td>
    </tr>
    <tr>
      <th>1088</th>
      <td>268</td>
      <td>C</td>
      <td>113</td>
      <td>BR11</td>
      <td>0.421642</td>
      <td>2024-01-31 23:43</td>
      <td>2024-01-31 23:44</td>
    </tr>
  </tbody>
</table>
</div>


    Display the first few rows of the training, testing and forecasting weather data



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>timestamp</th>
      <th>time_end</th>
      <th>time_period_text</th>
      <th>temperature_low</th>
      <th>temperature_high</th>
      <th>temperature_unit</th>
      <th>relative_humidity_low</th>
      <th>relative_humidity_high</th>
      <th>relative_humidity_unit</th>
      <th>wind_speed_low</th>
      <th>...</th>
      <th>east_forecast_text</th>
      <th>central_forecast_code</th>
      <th>central_forecast_text</th>
      <th>south_forecast_code</th>
      <th>south_forecast_text</th>
      <th>north_forecast_code</th>
      <th>north_forecast_text</th>
      <th>average_temperature</th>
      <th>average_relative_humidity</th>
      <th>average_wind_speed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2022-01-01 06:00</td>
      <td>2022-01-01 12:00</td>
      <td>6 am to Midday 1 Jan</td>
      <td>24</td>
      <td>33</td>
      <td>Degrees Celsius</td>
      <td>55</td>
      <td>90</td>
      <td>Percentage</td>
      <td>15</td>
      <td>...</td>
      <td>Windy</td>
      <td>WD</td>
      <td>Windy</td>
      <td>WD</td>
      <td>Windy</td>
      <td>WD</td>
      <td>Windy</td>
      <td>28.5</td>
      <td>72.5</td>
      <td>22.5</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2022-01-01 12:00</td>
      <td>2022-01-01 18:00</td>
      <td>Midday to 6 pm 1 Jan</td>
      <td>24</td>
      <td>33</td>
      <td>Degrees Celsius</td>
      <td>55</td>
      <td>90</td>
      <td>Percentage</td>
      <td>15</td>
      <td>...</td>
      <td>Windy</td>
      <td>WD</td>
      <td>Windy</td>
      <td>WD</td>
      <td>Windy</td>
      <td>WD</td>
      <td>Windy</td>
      <td>28.5</td>
      <td>72.5</td>
      <td>22.5</td>
    </tr>
    <tr>
      <th>152</th>
      <td>2023-01-31 12:00</td>
      <td>2023-01-31 18:00</td>
      <td>Midday to 6 pm 31 Jan</td>
      <td>23</td>
      <td>31</td>
      <td>Degrees Celsius</td>
      <td>60</td>
      <td>95</td>
      <td>Percentage</td>
      <td>15</td>
      <td>...</td>
      <td>Showers</td>
      <td>SH</td>
      <td>Showers</td>
      <td>SH</td>
      <td>Showers</td>
      <td>SH</td>
      <td>Showers</td>
      <td>27.0</td>
      <td>77.5</td>
      <td>20.0</td>
    </tr>
    <tr>
      <th>153</th>
      <td>2023-01-31 18:00</td>
      <td>2023-02-01 00:00</td>
      <td>6 pm to Midnight 31 Jan</td>
      <td>23</td>
      <td>31</td>
      <td>Degrees Celsius</td>
      <td>60</td>
      <td>95</td>
      <td>Percentage</td>
      <td>15</td>
      <td>...</td>
      <td>Partly Cloudy (Night)</td>
      <td>PN</td>
      <td>Partly Cloudy (Night)</td>
      <td>PN</td>
      <td>Partly Cloudy (Night)</td>
      <td>PN</td>
      <td>Partly Cloudy (Night)</td>
      <td>27.0</td>
      <td>77.5</td>
      <td>20.0</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 25 columns</p>
</div>



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>timestamp</th>
      <th>time_end</th>
      <th>time_period_text</th>
      <th>temperature_low</th>
      <th>temperature_high</th>
      <th>temperature_unit</th>
      <th>relative_humidity_low</th>
      <th>relative_humidity_high</th>
      <th>relative_humidity_unit</th>
      <th>wind_speed_low</th>
      <th>...</th>
      <th>east_forecast_text</th>
      <th>central_forecast_code</th>
      <th>central_forecast_text</th>
      <th>south_forecast_code</th>
      <th>south_forecast_text</th>
      <th>north_forecast_code</th>
      <th>north_forecast_text</th>
      <th>average_temperature</th>
      <th>average_relative_humidity</th>
      <th>average_wind_speed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2023-01-01 06:00</td>
      <td>2023-01-01 12:00</td>
      <td>6 am to Midday 01 Jan</td>
      <td>24</td>
      <td>31</td>
      <td>Degrees Celsius</td>
      <td>65</td>
      <td>95</td>
      <td>Percentage</td>
      <td>10</td>
      <td>...</td>
      <td>Showers</td>
      <td>SH</td>
      <td>Showers</td>
      <td>SH</td>
      <td>Showers</td>
      <td>SH</td>
      <td>Showers</td>
      <td>27.5</td>
      <td>80.0</td>
      <td>15.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2023-01-01 12:00</td>
      <td>2023-01-01 18:00</td>
      <td>Midday to 6 pm 01 Jan</td>
      <td>24</td>
      <td>31</td>
      <td>Degrees Celsius</td>
      <td>65</td>
      <td>95</td>
      <td>Percentage</td>
      <td>10</td>
      <td>...</td>
      <td>Thundery Showers</td>
      <td>TL</td>
      <td>Thundery Showers</td>
      <td>TL</td>
      <td>Thundery Showers</td>
      <td>TL</td>
      <td>Thundery Showers</td>
      <td>27.5</td>
      <td>80.0</td>
      <td>15.0</td>
    </tr>
    <tr>
      <th>85</th>
      <td>2024-01-19 00:00</td>
      <td>2024-01-19 06:00</td>
      <td>Midnight to 6 am 19 Jan</td>
      <td>24</td>
      <td>31</td>
      <td>Degrees Celsius</td>
      <td>65</td>
      <td>95</td>
      <td>Percentage</td>
      <td>10</td>
      <td>...</td>
      <td>Light Rain</td>
      <td>LR</td>
      <td>Light Rain</td>
      <td>LR</td>
      <td>Light Rain</td>
      <td>LR</td>
      <td>Light Rain</td>
      <td>27.5</td>
      <td>80.0</td>
      <td>15.0</td>
    </tr>
    <tr>
      <th>86</th>
      <td>2024-01-19 00:00</td>
      <td>2024-01-19 06:00</td>
      <td>Midnight to 6 am 19 Jan</td>
      <td>24</td>
      <td>31</td>
      <td>Degrees Celsius</td>
      <td>65</td>
      <td>95</td>
      <td>Percentage</td>
      <td>10</td>
      <td>...</td>
      <td>Partly Cloudy (Night)</td>
      <td>PN</td>
      <td>Partly Cloudy (Night)</td>
      <td>PN</td>
      <td>Partly Cloudy (Night)</td>
      <td>PN</td>
      <td>Partly Cloudy (Night)</td>
      <td>27.5</td>
      <td>80.0</td>
      <td>15.0</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 25 columns</p>
</div>



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>timestamp</th>
      <th>time_end</th>
      <th>time_period_text</th>
      <th>temperature_low</th>
      <th>temperature_high</th>
      <th>temperature_unit</th>
      <th>relative_humidity_low</th>
      <th>relative_humidity_high</th>
      <th>relative_humidity_unit</th>
      <th>wind_speed_low</th>
      <th>...</th>
      <th>east_forecast_text</th>
      <th>central_forecast_code</th>
      <th>central_forecast_text</th>
      <th>south_forecast_code</th>
      <th>south_forecast_text</th>
      <th>north_forecast_code</th>
      <th>north_forecast_text</th>
      <th>average_temperature</th>
      <th>average_relative_humidity</th>
      <th>average_wind_speed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2024-01-19 06:00</td>
      <td>2024-01-19 12:00</td>
      <td>6 am to Midday 19 Jan</td>
      <td>24</td>
      <td>31</td>
      <td>Degrees Celsius</td>
      <td>65</td>
      <td>95</td>
      <td>Percentage</td>
      <td>10</td>
      <td>...</td>
      <td>Partly Cloudy (Day)</td>
      <td>PC</td>
      <td>Partly Cloudy (Day)</td>
      <td>PC</td>
      <td>Partly Cloudy (Day)</td>
      <td>PC</td>
      <td>Partly Cloudy (Day)</td>
      <td>27.5</td>
      <td>80.0</td>
      <td>15.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2024-01-19 06:00</td>
      <td>2024-01-19 12:00</td>
      <td>6 am to Midday 19 Jan</td>
      <td>24</td>
      <td>32</td>
      <td>Degrees Celsius</td>
      <td>70</td>
      <td>95</td>
      <td>Percentage</td>
      <td>10</td>
      <td>...</td>
      <td>Partly Cloudy (Day)</td>
      <td>PC</td>
      <td>Partly Cloudy (Day)</td>
      <td>PC</td>
      <td>Partly Cloudy (Day)</td>
      <td>PC</td>
      <td>Partly Cloudy (Day)</td>
      <td>28.0</td>
      <td>82.5</td>
      <td>17.5</td>
    </tr>
    <tr>
      <th>86</th>
      <td>2024-01-31 12:00</td>
      <td>2024-01-31 18:00</td>
      <td>Midday to 6 pm 31 Jan</td>
      <td>24</td>
      <td>34</td>
      <td>Degrees Celsius</td>
      <td>60</td>
      <td>95</td>
      <td>Percentage</td>
      <td>10</td>
      <td>...</td>
      <td>Cloudy</td>
      <td>TL</td>
      <td>Thundery Showers</td>
      <td>CL</td>
      <td>Cloudy</td>
      <td>TL</td>
      <td>Thundery Showers</td>
      <td>29.0</td>
      <td>77.5</td>
      <td>15.0</td>
    </tr>
    <tr>
      <th>87</th>
      <td>2024-01-31 18:00</td>
      <td>2024-02-01 00:00</td>
      <td>6 pm to Midnight 31 Jan</td>
      <td>24</td>
      <td>34</td>
      <td>Degrees Celsius</td>
      <td>60</td>
      <td>95</td>
      <td>Percentage</td>
      <td>10</td>
      <td>...</td>
      <td>Partly Cloudy (Night)</td>
      <td>PN</td>
      <td>Partly Cloudy (Night)</td>
      <td>PN</td>
      <td>Partly Cloudy (Night)</td>
      <td>PN</td>
      <td>Partly Cloudy (Night)</td>
      <td>29.0</td>
      <td>77.5</td>
      <td>15.0</td>
    </tr>
  </tbody>
</table>
<p>4 rows × 25 columns</p>
</div>



\`\`\`python
import pandas as pd
folder_path = 'data/'
carpark_info_df = pd.read_csv(folder_path + 'carpark_info.csv')
carpark_info_df.set_index('car_park_no', inplace=True)

carpark_info_df = carpark_info_df[carpark_info_df.index.isin(selected_carparks_set)]
print(carpark_info_df.shape)
display(carpark_info_df.head(2))
\`\`\`

    (50, 13)



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>address</th>
      <th>x_coord</th>
      <th>y_coord</th>
      <th>car_park_type</th>
      <th>type_of_parking_system</th>
      <th>short_term_parking</th>
      <th>free_parking</th>
      <th>night_parking</th>
      <th>car_park_decks</th>
      <th>gantry_height</th>
      <th>car_park_basement</th>
      <th>latitude</th>
      <th>longitude</th>
    </tr>
    <tr>
      <th>car_park_no</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>AH1</th>
      <td>BLK 101 JALAN DUSUN</td>
      <td>29257.7203</td>
      <td>34500.3599</td>
      <td>SURFACE CAR PARK</td>
      <td>ELECTRONIC PARKING</td>
      <td>WHOLE DAY</td>
      <td>SUN &amp; PH FR 7AM-10.30PM</td>
      <td>YES</td>
      <td>0</td>
      <td>0.0</td>
      <td>N</td>
      <td>1.328283</td>
      <td>103.844620</td>
    </tr>
    <tr>
      <th>A73</th>
      <td>BLK 641/645 ANG MO KIO STREET 61</td>
      <td>28835.3369</td>
      <td>40091.5441</td>
      <td>SURFACE CAR PARK</td>
      <td>ELECTRONIC PARKING</td>
      <td>WHOLE DAY</td>
      <td>SUN &amp; PH FR 7AM-10.30PM</td>
      <td>YES</td>
      <td>0</td>
      <td>0.0</td>
      <td>N</td>
      <td>1.378848</td>
      <td>103.840825</td>
    </tr>
  </tbody>
</table>
</div>


Here, we visualize the distribution of the carpark properties across the selected carparks


\`\`\`python
import matplotlib.pyplot as plt
import seaborn as sns

common_font_size = 15
fig, axes = plt.subplots(4, 2, figsize=(10, 15))

# Distribution of Carpark Types
sns.countplot(data=carpark_info_df, x='car_park_type', ax=axes[0, 0])
axes[0, 0].set_title('Distribution of Carpark Types', fontsize=common_font_size)
axes[0, 0].tick_params(axis='x', rotation=45)

# Availability of Free Parking
sns.countplot(data=carpark_info_df, x='free_parking', ax=axes[0, 1])
axes[0, 1].set_title('Availability of Free Parking', fontsize=common_font_size)
axes[0, 1].tick_params(axis='x', rotation=45)

# Gantry Height Distribution
sns.histplot(data=carpark_info_df, x='gantry_height', bins=20, kde=False, ax=axes[1, 0])
axes[1, 0].set_title('Distribution of Gantry Heights', fontsize=common_font_size)

# Type of Parking System
sns.countplot(data=carpark_info_df, x='type_of_parking_system', ax=axes[1, 1])
axes[1, 1].set_title('Type of Parking System', fontsize=common_font_size)
axes[1, 1].tick_params(axis='x', rotation=45)

# Short Term Parking
sns.countplot(data=carpark_info_df, x='short_term_parking', ax=axes[2, 0])
axes[2, 0].set_title('Short Term Parking Availability', fontsize=common_font_size)
axes[2, 0].tick_params(axis='x', rotation=45)

# Night Parking
sns.countplot(data=carpark_info_df, x='night_parking', ax=axes[2, 1])
axes[2, 1].set_title('Night Parking Availability', fontsize=common_font_size)
axes[2, 1].tick_params(axis='x', rotation=45)

# Car Park Decks
sns.histplot(data=carpark_info_df, x='car_park_decks', bins=20, kde=False, ax=axes[3, 0])
axes[3, 0].set_title('Distribution of Car Park Decks', fontsize=common_font_size)

# Car Park Basement
sns.countplot(data=carpark_info_df, x='car_park_basement', ax=axes[3, 1])
axes[3, 1].set_title('Car Park Basement Availability', fontsize=common_font_size)
axes[3, 1].tick_params(axis='x', rotation=45)

plt.tight_layout()
plt.show()

\`\`\`


    
![png](https://github.com/CheahHaoYi/CheahHaoYi.github.io/blob/main/src/lib/data/md_project/Carpark_Availability_Prediction_files/Carpark_Availability_Prediction_47_0.png?raw=true)  


Here, we visualize the locations of the selected carparks on a map


\`\`\`python
import pandas as pd
import numpy as np
import plotly.graph_objects as go
import geopandas
import math
import geopy
import geopy.distance
from datetime import datetime

# Plot the carpark locations of those selected on a map

# Create a GeoDataFrame from the carpark_info_df
gdf = geopandas.GeoDataFrame(
    carpark_info_df, geometry=geopandas.points_from_xy(carpark_info_df.longitude, carpark_info_df.latitude))

# Plot the carpark locations on a map using Plotly
fig = go.Figure(go.Scattermapbox(
    lat=gdf.geometry.y,
    lon=gdf.geometry.x,
    mode='markers',
    marker=go.scattermapbox.Marker(
        size=9
    ),
    text=gdf['address'],
))

fig.update_layout(
    mapbox_style="open-street-map",
    mapbox=dict(
        center=go.layout.mapbox.Center(
            lat=gdf.geometry.y.mean(),
            lon=gdf.geometry.x.mean()
        ),
        zoom=11
    ),
    title="Carpark Locations in Singapore"
)

fig.show()
\`\`\`



# Exploration of Machine Learning Algorithms to derive insights on carpark availability

In this section, we'll be employing different machine learning algorithm to explore the relationships between different variables and how that would allow car drivers to understand the carpark availability around Singapore

### 1. Support Vector Machine to predict car park availability during the day
- We will train an SVM on historical occupancy data and use car park characteristics to predict car park will likely have availability or not.

### 2.  Decision Tree and Random Forest to understand factors influencing car park availability
- The model can show how features such as how high humidity levels or certain weather conditions (like rain) affect occupancy

### 3. Potential Enhancement: Time Series Model to forecast park occupancy
- Can be used if the data shows a clear linear trend over time (e.g., car park occupancy tends to increase at certain times of the day or year).

## Support Vector Machine to predict car park availability during the day

Preprocessing of data for SVC


\`\`\`python
import numpy as np
import pandas as pd
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix

column_from_info = ['car_park_type', 'type_of_parking_system', 'short_term_parking',
                    'free_parking', 'night_parking', 'car_park_decks', 'gantry_height', 'car_park_basement']

def get_row_of_carpark_data(carpark_name, carpark_data, carpark_info, info_col=None):
    carpark_info_row = carpark_info.loc[carpark_name, info_col] if info_col else carpark_info.loc[carpark_name]

    carpark_info_row['max_occupancy_rate'] = carpark_data['occupancy_rate'].max()
    carpark_info_row['min_occupancy_rate'] = carpark_data['occupancy_rate'].min()
    carpark_info_row['std_occupancy_rate'] = carpark_data['occupancy_rate'].std()
    carpark_info_row['total_lots'] = carpark_data['total_lots'].mean()

    carpark_info_row['carpark_name'] = carpark_name
    carpark_info_row['availability'] = 'Available' if carpark_data['occupancy_rate'].mean() < 0.5 else 'Full'
    return carpark_info_row


def process_data_for_SVC(carpark_data_dict, carpark_info, info_col=None):
    data = []
    for carpark_name, carpark_data in carpark_data_dict.items():
        data.append(get_row_of_carpark_data(carpark_name, carpark_data, carpark_info, info_col))
    return pd.DataFrame(data).reset_index(drop=True)


SVC_training_data = process_data_for_SVC(training_carpark_data_dict, carpark_info_df, column_from_info)
SVC_testing_data = process_data_for_SVC(testing_carpark_data_dict, carpark_info_df, column_from_info)

print(SVC_training_data.shape)
display(SVC_training_data.head())
\`\`\`

    (50, 14)



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>car_park_type</th>
      <th>type_of_parking_system</th>
      <th>short_term_parking</th>
      <th>free_parking</th>
      <th>night_parking</th>
      <th>car_park_decks</th>
      <th>gantry_height</th>
      <th>car_park_basement</th>
      <th>max_occupancy_rate</th>
      <th>min_occupancy_rate</th>
      <th>std_occupancy_rate</th>
      <th>total_lots</th>
      <th>carpark_name</th>
      <th>availability</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>SURFACE CAR PARK</td>
      <td>ELECTRONIC PARKING</td>
      <td>7AM-10.30PM</td>
      <td>SUN &amp; PH FR 7AM-10.30PM</td>
      <td>NO</td>
      <td>0</td>
      <td>4.50</td>
      <td>N</td>
      <td>0.709957</td>
      <td>0.173160</td>
      <td>0.157155</td>
      <td>231.0</td>
      <td>T75</td>
      <td>Available</td>
    </tr>
    <tr>
      <th>1</th>
      <td>SURFACE CAR PARK</td>
      <td>ELECTRONIC PARKING</td>
      <td>WHOLE DAY</td>
      <td>SUN &amp; PH FR 7AM-10.30PM</td>
      <td>YES</td>
      <td>0</td>
      <td>0.00</td>
      <td>N</td>
      <td>0.746377</td>
      <td>0.219807</td>
      <td>0.107641</td>
      <td>414.0</td>
      <td>A73</td>
      <td>Available</td>
    </tr>
    <tr>
      <th>2</th>
      <td>SURFACE CAR PARK</td>
      <td>ELECTRONIC PARKING</td>
      <td>WHOLE DAY</td>
      <td>SUN &amp; PH FR 7AM-10.30PM</td>
      <td>YES</td>
      <td>0</td>
      <td>0.00</td>
      <td>N</td>
      <td>0.764925</td>
      <td>0.208955</td>
      <td>0.139401</td>
      <td>268.0</td>
      <td>BR11</td>
      <td>Available</td>
    </tr>
    <tr>
      <th>3</th>
      <td>SURFACE CAR PARK</td>
      <td>ELECTRONIC PARKING</td>
      <td>WHOLE DAY</td>
      <td>SUN &amp; PH FR 7AM-10.30PM</td>
      <td>YES</td>
      <td>0</td>
      <td>4.50</td>
      <td>N</td>
      <td>0.772532</td>
      <td>0.244635</td>
      <td>0.099439</td>
      <td>233.0</td>
      <td>Y34A</td>
      <td>Full</td>
    </tr>
    <tr>
      <th>4</th>
      <td>BASEMENT CAR PARK</td>
      <td>ELECTRONIC PARKING</td>
      <td>7AM-10.30PM</td>
      <td>NO</td>
      <td>NO</td>
      <td>1</td>
      <td>2.15</td>
      <td>Y</td>
      <td>0.643777</td>
      <td>0.158798</td>
      <td>0.131646</td>
      <td>233.0</td>
      <td>SK71</td>
      <td>Available</td>
    </tr>
  </tbody>
</table>
</div>


Result plotting for SVC


\`\`\`python
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, confusion_matrix, ConfusionMatrixDisplay
import matplotlib.pyplot as plt

def model_for_carpark_properties(data, target, model=SVC(kernel='rbf')):
    X = data.drop(columns=[target])
    categorical_columns = X.select_dtypes(exclude='number').columns
    X = pd.get_dummies(X, columns=categorical_columns, drop_first=True)

    numerical_columns = X.select_dtypes(include='number').columns
    scalar = StandardScaler()
    X[numerical_columns] = scalar.fit_transform(X[numerical_columns])

    y = data[target].apply(lambda x: 1 if x == 'Available' else 0)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    return model, classification_report(y_test, y_pred), confusion_matrix(y_test, y_pred, normalize='true')

model, report, matrix = model_for_carpark_properties(SVC_training_data, 'availability')

print(report)
disp = ConfusionMatrixDisplay(confusion_matrix=matrix, display_labels=['Full', 'Available'])
disp.plot(cmap=plt.cm.Blues)
plt.title("Confusion Matrix")
plt.show()
\`\`\`

                  precision    recall  f1-score   support
    
               0       0.50      1.00      0.67         1
               1       1.00      0.89      0.94         9
    
        accuracy                           0.90        10
       macro avg       0.75      0.94      0.80        10
    weighted avg       0.95      0.90      0.91        10
    



    
![png](https://github.com/CheahHaoYi/CheahHaoYi.github.io/blob/main/src/lib/data/md_project/Carpark_Availability_Prediction_files/Carpark_Availability_Prediction_55_1.png?raw=true)    


Hyperparameter tuning


\`\`\`python
from sklearn.model_selection import GridSearchCV

def prep_data_for_hypertuning(data, target):
    X = data.drop(columns=[target])
    categorical_columns = X.select_dtypes(exclude='number').columns
    X = pd.get_dummies(X, columns=categorical_columns, drop_first=True)

    numerical_columns = X.select_dtypes(include='number').columns
    scalar = StandardScaler()
    X[numerical_columns] = scalar.fit_transform(X[numerical_columns])

    y = data[target].apply(lambda x: 1 if x == 'Available' else 0)
    return X, y

param_grid = {
    'C': [0.1, 1, 10, 100],
    'gamma': [1, 0.1, 0.01, 0.001],
    'kernel': ['rbf', 'linear']
}

X_scaled, y = prep_data_for_hypertuning(SVC_training_data, 'availability')
grid = GridSearchCV(SVC(), param_grid, refit=True, verbose=2)
grid.fit(X_scaled, SVC_training_data['availability'])

print("\\n")
print("Best parameters found: ", grid.best_params_)
print("Best estimator found: ", grid.best_estimator_)
\`\`\`

    Fitting 5 folds for each of 32 candidates, totalling 160 fits
    [CV] END .........................C=0.1, gamma=1, kernel=rbf; total time=   0.0s
    [CV] END .........................C=0.1, gamma=1, kernel=rbf; total time=   0.0s
    [CV] END .........................C=0.1, gamma=1, kernel=rbf; total time=   0.0s
    [CV] END .........................C=0.1, gamma=1, kernel=rbf; total time=   0.0s
    [CV] END .........................C=0.1, gamma=1, kernel=rbf; total time=   0.0s
    [CV] END ......................C=0.1, gamma=1, kernel=linear; total time=   0.0s
    [CV] END ......................C=0.1, gamma=1, kernel=linear; total time=   0.0s
    [CV] END ......................C=0.1, gamma=1, kernel=linear; total time=   0.0s
    [CV] END ......................C=0.1, gamma=1, kernel=linear; total time=   0.0s
    [CV] END ......................C=0.1, gamma=1, kernel=linear; total time=   0.0s
    [CV] END .......................C=0.1, gamma=0.1, kernel=rbf; total time=   0.0s
    [CV] END .......................C=0.1, gamma=0.1, kernel=rbf; total time=   0.0s
    [CV] END .......................C=0.1, gamma=0.1, kernel=rbf; total time=   0.0s
    [CV] END .......................C=0.1, gamma=0.1, kernel=rbf; total time=   0.0s
    [CV] END .......................C=0.1, gamma=0.1, kernel=rbf; total time=   0.0s
    [CV] END ....................C=0.1, gamma=0.1, kernel=linear; total time=   0.0s
    [CV] END ....................C=0.1, gamma=0.1, kernel=linear; total time=   0.0s
    [CV] END ....................C=0.1, gamma=0.1, kernel=linear; total time=   0.0s
    [CV] END ....................C=0.1, gamma=0.1, kernel=linear; total time=   0.0s
    [CV] END ....................C=0.1, gamma=0.1, kernel=linear; total time=   0.0s
    [CV] END ......................C=0.1, gamma=0.01, kernel=rbf; total time=   0.0s
    [CV] END ......................C=0.1, gamma=0.01, kernel=rbf; total time=   0.0s
    [CV] END ......................C=0.1, gamma=0.01, kernel=rbf; total time=   0.0s
    [CV] END ......................C=0.1, gamma=0.01, kernel=rbf; total time=   0.0s
    [CV] END ......................C=0.1, gamma=0.01, kernel=rbf; total time=   0.0s
    [CV] END ...................C=0.1, gamma=0.01, kernel=linear; total time=   0.0s
    [CV] END ...................C=0.1, gamma=0.01, kernel=linear; total time=   0.0s
    [CV] END ...................C=0.1, gamma=0.01, kernel=linear; total time=   0.0s
    [CV] END ...................C=0.1, gamma=0.01, kernel=linear; total time=   0.0s
    [CV] END ...................C=0.1, gamma=0.01, kernel=linear; total time=   0.0s
    [CV] END .....................C=0.1, gamma=0.001, kernel=rbf; total time=   0.0s
    [CV] END .....................C=0.1, gamma=0.001, kernel=rbf; total time=   0.0s
    [CV] END .....................C=0.1, gamma=0.001, kernel=rbf; total time=   0.0s
    [CV] END .....................C=0.1, gamma=0.001, kernel=rbf; total time=   0.0s
    [CV] END .....................C=0.1, gamma=0.001, kernel=rbf; total time=   0.0s
    [CV] END ..................C=0.1, gamma=0.001, kernel=linear; total time=   0.0s
    [CV] END ..................C=0.1, gamma=0.001, kernel=linear; total time=   0.0s
    [CV] END ..................C=0.1, gamma=0.001, kernel=linear; total time=   0.0s
    [CV] END ..................C=0.1, gamma=0.001, kernel=linear; total time=   0.0s
    [CV] END ..................C=0.1, gamma=0.001, kernel=linear; total time=   0.0s
    [CV] END ...........................C=1, gamma=1, kernel=rbf; total time=   0.0s
    [CV] END ...........................C=1, gamma=1, kernel=rbf; total time=   0.0s
    [CV] END ...........................C=1, gamma=1, kernel=rbf; total time=   0.0s
    [CV] END ...........................C=1, gamma=1, kernel=rbf; total time=   0.0s
    [CV] END ...........................C=1, gamma=1, kernel=rbf; total time=   0.0s
    [CV] END ........................C=1, gamma=1, kernel=linear; total time=   0.0s
    [CV] END ........................C=1, gamma=1, kernel=linear; total time=   0.0s
    [CV] END ........................C=1, gamma=1, kernel=linear; total time=   0.0s
    [CV] END ........................C=1, gamma=1, kernel=linear; total time=   0.0s
    [CV] END ........................C=1, gamma=1, kernel=linear; total time=   0.0s
    [CV] END .........................C=1, gamma=0.1, kernel=rbf; total time=   0.0s
    [CV] END .........................C=1, gamma=0.1, kernel=rbf; total time=   0.0s
    [CV] END .........................C=1, gamma=0.1, kernel=rbf; total time=   0.0s
    [CV] END .........................C=1, gamma=0.1, kernel=rbf; total time=   0.0s
    [CV] END .........................C=1, gamma=0.1, kernel=rbf; total time=   0.0s
    [CV] END ......................C=1, gamma=0.1, kernel=linear; total time=   0.0s
    [CV] END ......................C=1, gamma=0.1, kernel=linear; total time=   0.0s
    [CV] END ......................C=1, gamma=0.1, kernel=linear; total time=   0.0s
    [CV] END ......................C=1, gamma=0.1, kernel=linear; total time=   0.0s
    [CV] END ......................C=1, gamma=0.1, kernel=linear; total time=   0.0s
    [CV] END ........................C=1, gamma=0.01, kernel=rbf; total time=   0.0s
    [CV] END ........................C=1, gamma=0.01, kernel=rbf; total time=   0.0s
    [CV] END ........................C=1, gamma=0.01, kernel=rbf; total time=   0.0s
    [CV] END ........................C=1, gamma=0.01, kernel=rbf; total time=   0.0s
    [CV] END ........................C=1, gamma=0.01, kernel=rbf; total time=   0.0s
    [CV] END .....................C=1, gamma=0.01, kernel=linear; total time=   0.0s
    [CV] END .....................C=1, gamma=0.01, kernel=linear; total time=   0.0s
    [CV] END .....................C=1, gamma=0.01, kernel=linear; total time=   0.0s
    [CV] END .....................C=1, gamma=0.01, kernel=linear; total time=   0.0s
    [CV] END .....................C=1, gamma=0.01, kernel=linear; total time=   0.0s
    [CV] END .......................C=1, gamma=0.001, kernel=rbf; total time=   0.0s
    [CV] END .......................C=1, gamma=0.001, kernel=rbf; total time=   0.0s
    [CV] END .......................C=1, gamma=0.001, kernel=rbf; total time=   0.0s
    [CV] END .......................C=1, gamma=0.001, kernel=rbf; total time=   0.0s
    [CV] END .......................C=1, gamma=0.001, kernel=rbf; total time=   0.0s
    [CV] END ....................C=1, gamma=0.001, kernel=linear; total time=   0.0s
    [CV] END ....................C=1, gamma=0.001, kernel=linear; total time=   0.0s
    [CV] END ....................C=1, gamma=0.001, kernel=linear; total time=   0.0s
    [CV] END ....................C=1, gamma=0.001, kernel=linear; total time=   0.0s
    [CV] END ....................C=1, gamma=0.001, kernel=linear; total time=   0.0s
    [CV] END ..........................C=10, gamma=1, kernel=rbf; total time=   0.0s
    [CV] END ..........................C=10, gamma=1, kernel=rbf; total time=   0.0s
    [CV] END ..........................C=10, gamma=1, kernel=rbf; total time=   0.0s
    [CV] END ..........................C=10, gamma=1, kernel=rbf; total time=   0.0s
    [CV] END ..........................C=10, gamma=1, kernel=rbf; total time=   0.0s
    [CV] END .......................C=10, gamma=1, kernel=linear; total time=   0.0s
    [CV] END .......................C=10, gamma=1, kernel=linear; total time=   0.0s
    [CV] END .......................C=10, gamma=1, kernel=linear; total time=   0.0s
    [CV] END .......................C=10, gamma=1, kernel=linear; total time=   0.0s
    [CV] END .......................C=10, gamma=1, kernel=linear; total time=   0.0s
    [CV] END ........................C=10, gamma=0.1, kernel=rbf; total time=   0.0s
    [CV] END ........................C=10, gamma=0.1, kernel=rbf; total time=   0.0s
    [CV] END ........................C=10, gamma=0.1, kernel=rbf; total time=   0.0s
    [CV] END ........................C=10, gamma=0.1, kernel=rbf; total time=   0.0s
    [CV] END ........................C=10, gamma=0.1, kernel=rbf; total time=   0.0s
    [CV] END .....................C=10, gamma=0.1, kernel=linear; total time=   0.0s
    [CV] END .....................C=10, gamma=0.1, kernel=linear; total time=   0.0s
    [CV] END .....................C=10, gamma=0.1, kernel=linear; total time=   0.0s
    [CV] END .....................C=10, gamma=0.1, kernel=linear; total time=   0.0s
    [CV] END .....................C=10, gamma=0.1, kernel=linear; total time=   0.0s
    [CV] END .......................C=10, gamma=0.01, kernel=rbf; total time=   0.0s
    [CV] END .......................C=10, gamma=0.01, kernel=rbf; total time=   0.0s
    [CV] END .......................C=10, gamma=0.01, kernel=rbf; total time=   0.0s
    [CV] END .......................C=10, gamma=0.01, kernel=rbf; total time=   0.0s
    [CV] END .......................C=10, gamma=0.01, kernel=rbf; total time=   0.0s
    [CV] END ....................C=10, gamma=0.01, kernel=linear; total time=   0.0s
    [CV] END ....................C=10, gamma=0.01, kernel=linear; total time=   0.0s
    [CV] END ....................C=10, gamma=0.01, kernel=linear; total time=   0.0s
    [CV] END ....................C=10, gamma=0.01, kernel=linear; total time=   0.0s
    [CV] END ....................C=10, gamma=0.01, kernel=linear; total time=   0.0s
    [CV] END ......................C=10, gamma=0.001, kernel=rbf; total time=   0.0s
    [CV] END ......................C=10, gamma=0.001, kernel=rbf; total time=   0.0s
    [CV] END ......................C=10, gamma=0.001, kernel=rbf; total time=   0.0s
    [CV] END ......................C=10, gamma=0.001, kernel=rbf; total time=   0.0s
    [CV] END ......................C=10, gamma=0.001, kernel=rbf; total time=   0.0s
    [CV] END ...................C=10, gamma=0.001, kernel=linear; total time=   0.0s
    [CV] END ...................C=10, gamma=0.001, kernel=linear; total time=   0.0s
    [CV] END ...................C=10, gamma=0.001, kernel=linear; total time=   0.0s
    [CV] END ...................C=10, gamma=0.001, kernel=linear; total time=   0.0s
    [CV] END ...................C=10, gamma=0.001, kernel=linear; total time=   0.0s
    [CV] END .........................C=100, gamma=1, kernel=rbf; total time=   0.0s
    [CV] END .........................C=100, gamma=1, kernel=rbf; total time=   0.0s
    [CV] END .........................C=100, gamma=1, kernel=rbf; total time=   0.0s
    [CV] END .........................C=100, gamma=1, kernel=rbf; total time=   0.0s
    [CV] END .........................C=100, gamma=1, kernel=rbf; total time=   0.0s
    [CV] END ......................C=100, gamma=1, kernel=linear; total time=   0.0s
    [CV] END ......................C=100, gamma=1, kernel=linear; total time=   0.0s
    [CV] END ......................C=100, gamma=1, kernel=linear; total time=   0.0s
    [CV] END ......................C=100, gamma=1, kernel=linear; total time=   0.0s
    [CV] END ......................C=100, gamma=1, kernel=linear; total time=   0.0s
    [CV] END .......................C=100, gamma=0.1, kernel=rbf; total time=   0.0s
    [CV] END .......................C=100, gamma=0.1, kernel=rbf; total time=   0.0s
    [CV] END .......................C=100, gamma=0.1, kernel=rbf; total time=   0.0s
    [CV] END .......................C=100, gamma=0.1, kernel=rbf; total time=   0.0s
    [CV] END .......................C=100, gamma=0.1, kernel=rbf; total time=   0.0s
    [CV] END ....................C=100, gamma=0.1, kernel=linear; total time=   0.0s
    [CV] END ....................C=100, gamma=0.1, kernel=linear; total time=   0.0s
    [CV] END ....................C=100, gamma=0.1, kernel=linear; total time=   0.0s
    [CV] END ....................C=100, gamma=0.1, kernel=linear; total time=   0.0s
    [CV] END ....................C=100, gamma=0.1, kernel=linear; total time=   0.0s
    [CV] END ......................C=100, gamma=0.01, kernel=rbf; total time=   0.0s
    [CV] END ......................C=100, gamma=0.01, kernel=rbf; total time=   0.0s
    [CV] END ......................C=100, gamma=0.01, kernel=rbf; total time=   0.0s
    [CV] END ......................C=100, gamma=0.01, kernel=rbf; total time=   0.0s
    [CV] END ......................C=100, gamma=0.01, kernel=rbf; total time=   0.0s
    [CV] END ...................C=100, gamma=0.01, kernel=linear; total time=   0.0s
    [CV] END ...................C=100, gamma=0.01, kernel=linear; total time=   0.0s
    [CV] END ...................C=100, gamma=0.01, kernel=linear; total time=   0.0s
    [CV] END ...................C=100, gamma=0.01, kernel=linear; total time=   0.0s
    [CV] END ...................C=100, gamma=0.01, kernel=linear; total time=   0.0s
    [CV] END .....................C=100, gamma=0.001, kernel=rbf; total time=   0.0s
    [CV] END .....................C=100, gamma=0.001, kernel=rbf; total time=   0.0s
    [CV] END .....................C=100, gamma=0.001, kernel=rbf; total time=   0.0s
    [CV] END .....................C=100, gamma=0.001, kernel=rbf; total time=   0.0s
    [CV] END .....................C=100, gamma=0.001, kernel=rbf; total time=   0.0s
    [CV] END ..................C=100, gamma=0.001, kernel=linear; total time=   0.0s
    [CV] END ..................C=100, gamma=0.001, kernel=linear; total time=   0.0s
    [CV] END ..................C=100, gamma=0.001, kernel=linear; total time=   0.0s
    [CV] END ..................C=100, gamma=0.001, kernel=linear; total time=   0.0s
    [CV] END ..................C=100, gamma=0.001, kernel=linear; total time=   0.0s
    
    
    Best parameters found:  {'C': 10, 'gamma': 1, 'kernel': 'linear'}
    Best estimator found:  SVC(C=10, gamma=1, kernel='linear')


## Decision Tree and Random Forest to understand factors influencing car park availability

Preprocessing of data for randomforest model
Here we are merging the tables containing hourly carpark availability with the weather forecast data which is recorded every 6 hours. Hence some preprocessing is required to merge the tables together


\`\`\`python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score

timestamp_format = '%Y-%m-%d %H'

column_from_carpark = ['occupancy_rate']
column_from_weather = ['average_temperature', 'average_relative_humidity', 'average_wind_speed', 'wind_direction',
                       'central_forecast_code', 'east_forecast_code', 'north_forecast_code', 'south_forecast_code', 'west_forecast_code']

# merge carpark and weather data by timestamp
def process_data_for_rf_model(carpark_data, weather_data, carpark_col=None, weather_col=None):
    # reformat timestamp of both dataframes
    carpark_data['timestamp'] = pd.to_datetime(carpark_data['timestamp']).dt.strftime(timestamp_format)
    weather_data['timestamp'] = pd.to_datetime(weather_data['timestamp']).dt.strftime(timestamp_format)

    # filter for the selected columns
    if carpark_col:
        carpark_data = carpark_data[carpark_col + ['timestamp']]
    if weather_col:
        weather_data = weather_data[weather_col + ['timestamp']]
    # Merge the carpark data and weather data on 'timestamp'
    merged_data = pd.merge(carpark_data, weather_data, on='timestamp')
    # Set the timestamp as the index
    merged_data.set_index('timestamp', inplace=True)
    return merged_data


rf_carpark_data_dict = {}

for carpark_num, carpark_data in training_carpark_data_dict.items():
    rf_carpark_data_dict[carpark_num] = process_data_for_rf_model(carpark_data, training_weather_data,
                                                                  carpark_col=column_from_carpark, weather_col=column_from_weather)

# Display the first few rows of the processed data
for cp, df in list(rf_carpark_data_dict.items())[:2]:
    print(f"Carpark number: {cp}")
    display(pd.concat([df.head(2), df.tail(2)]))

\`\`\`

    Carpark number: T75



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>occupancy_rate</th>
      <th>average_temperature</th>
      <th>average_relative_humidity</th>
      <th>average_wind_speed</th>
      <th>wind_direction</th>
      <th>central_forecast_code</th>
      <th>east_forecast_code</th>
      <th>north_forecast_code</th>
      <th>south_forecast_code</th>
      <th>west_forecast_code</th>
    </tr>
    <tr>
      <th>timestamp</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2023-01-10 06</th>
      <td>0.225108</td>
      <td>28.5</td>
      <td>77.5</td>
      <td>10.0</td>
      <td>WNW</td>
      <td>TL</td>
      <td>TL</td>
      <td>TL</td>
      <td>TL</td>
      <td>TL</td>
    </tr>
    <tr>
      <th>2023-01-10 06</th>
      <td>0.259740</td>
      <td>28.5</td>
      <td>77.5</td>
      <td>10.0</td>
      <td>WNW</td>
      <td>TL</td>
      <td>TL</td>
      <td>TL</td>
      <td>TL</td>
      <td>TL</td>
    </tr>
    <tr>
      <th>2023-01-31 18</th>
      <td>0.454545</td>
      <td>27.0</td>
      <td>77.5</td>
      <td>20.0</td>
      <td>NNE</td>
      <td>PN</td>
      <td>PN</td>
      <td>PN</td>
      <td>PN</td>
      <td>PN</td>
    </tr>
    <tr>
      <th>2023-01-31 18</th>
      <td>0.458874</td>
      <td>27.0</td>
      <td>77.5</td>
      <td>20.0</td>
      <td>NNE</td>
      <td>PN</td>
      <td>PN</td>
      <td>PN</td>
      <td>PN</td>
      <td>PN</td>
    </tr>
  </tbody>
</table>
</div>


    Carpark number: A73



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>occupancy_rate</th>
      <th>average_temperature</th>
      <th>average_relative_humidity</th>
      <th>average_wind_speed</th>
      <th>wind_direction</th>
      <th>central_forecast_code</th>
      <th>east_forecast_code</th>
      <th>north_forecast_code</th>
      <th>south_forecast_code</th>
      <th>west_forecast_code</th>
    </tr>
    <tr>
      <th>timestamp</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2023-01-10 06</th>
      <td>0.398551</td>
      <td>28.5</td>
      <td>77.5</td>
      <td>10.0</td>
      <td>WNW</td>
      <td>TL</td>
      <td>TL</td>
      <td>TL</td>
      <td>TL</td>
      <td>TL</td>
    </tr>
    <tr>
      <th>2023-01-10 06</th>
      <td>0.420290</td>
      <td>28.5</td>
      <td>77.5</td>
      <td>10.0</td>
      <td>WNW</td>
      <td>TL</td>
      <td>TL</td>
      <td>TL</td>
      <td>TL</td>
      <td>TL</td>
    </tr>
    <tr>
      <th>2023-01-31 18</th>
      <td>0.548309</td>
      <td>27.0</td>
      <td>77.5</td>
      <td>20.0</td>
      <td>NNE</td>
      <td>PN</td>
      <td>PN</td>
      <td>PN</td>
      <td>PN</td>
      <td>PN</td>
    </tr>
    <tr>
      <th>2023-01-31 18</th>
      <td>0.531401</td>
      <td>27.0</td>
      <td>77.5</td>
      <td>20.0</td>
      <td>NNE</td>
      <td>PN</td>
      <td>PN</td>
      <td>PN</td>
      <td>PN</td>
      <td>PN</td>
    </tr>
  </tbody>
</table>
</div>


Running random forest on each carpark


\`\`\`python
def model_for_availability_factors(merged_data, model=RandomForestRegressor(n_estimators=100, random_state=42)):
    # Split the data into features and target
    X = merged_data.drop(columns=['occupancy_rate'])
    categorical_columns = X.select_dtypes(exclude='number').columns
    X = pd.get_dummies(X, columns=categorical_columns, drop_first=True)
    y = merged_data['occupancy_rate']
    feature_columns = X.columns
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)  # Split the data into training and testing sets
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    return model, mse, feature_columns, X_test, y_test

# Run the model for all carpark numbers
carpark_models = {}
carpark_mse_list = []
for carpark_num, carpark_data in rf_carpark_data_dict.items():
    model, mse, feature_columns, X_test, y_test = model_for_availability_factors(carpark_data)
    feature_importance = model.feature_importances_
    carpark_models[carpark_num] = (model, feature_columns, feature_importance)
    carpark_mse_list.append(f"{carpark_num:4}: {mse:.4e}")


# Print the mean squared error for each carpark
for i in range(0, len(carpark_mse_list), 10):
    print(*carpark_mse_list[i:i+10], sep='\\t',end='\\n')

\`\`\`

    T75 : 7.5426e-03	A73 : 4.0930e-03	BR11: 7.1782e-03	Y34A: 6.1401e-03	SK71: 6.0966e-03	CC11: 6.4661e-03	U55 : 1.2936e-02	W4M : 3.7377e-03	Y13 : 7.4872e-03	T48 : 1.1114e-02
    J74 : 1.4052e-02	PL37: 9.7914e-03	Y35 : 1.3763e-02	BBM2: 4.4298e-03	SI8 : 3.8648e-02	PR13: 1.3563e-02	TB1 : 2.9612e-04	KTM3: 1.2776e-04	T24 : 3.4656e-03	HG76: 4.4697e-03
    U9  : 1.1595e-02	CK38: 1.1140e-02	T49 : 1.2983e-02	SE51: 3.1035e-03	BJ18: 1.7043e-02	BJ34: 1.2762e-02	HG70: 5.5781e-03	UA3 : 1.2176e-02	T80 : 4.7670e-03	JRM : 1.8111e-03
    K2  : 1.1100e-02	HG3D: 1.0269e-02	Y27 : 1.0477e-02	T51 : 1.2118e-02	Y26 : 7.6570e-03	PM46: 1.5613e-02	PL50: 8.4681e-03	U51 : 4.6494e-04	U38 : 7.9154e-03	B60 : 1.3298e-02
    CVBK: 8.7496e-03	BA2 : 4.8396e-03	PL35: 1.2045e-02	AH1 : 1.0593e-03	CK44: 5.3943e-03	TP53: 1.2283e-02	SK77: 1.6686e-02	PM10: 2.0712e-02	MP1M: 3.9081e-03	HG98: 1.9461e-02


Here, we plot the feature importances curve of each carpark to understand what are the top influencial factors of carpark availability.

The higher the feature importance value, the more importance the feature in deciding the value of the target variable.

The importance of a feature is computed as the total reduction of the criterion brought by the feature


\`\`\`python
# Plot feature importance for a few carparks
import matplotlib.pyplot as plt
import numpy as np
import random
from matplotlib.colors import LinearSegmentedColormap

num_features_to_plot = 10
num_subplot_rows = 4
num_subplot_cols = 2

num_carparks_to_plot = num_subplot_rows * num_subplot_cols

def plot_feature_importance(carpark_num, feature_importance, feature_columns, ax, base_color):
    global num_features_to_plot

    sorted_idx = feature_importance.argsort()[::-1]
    sorted_features = feature_columns[sorted_idx][:num_features_to_plot]
    sorted_importance = feature_importance[sorted_idx][:num_features_to_plot]

    # Create a gradient color map without white
    cmap = LinearSegmentedColormap.from_list("gradient", [base_color, "black"])
    colors = cmap(np.linspace(0, 1, num_features_to_plot))

    ax.bar(sorted_features, sorted_importance, color=colors)
    ax.set_ylabel("Feature Importance")
    ax.set_xlabel("Feature")
    ax.set_title(f"Top {num_features_to_plot} Feature Importance for Carpark {carpark_num}")
    ax.tick_params(axis='x', rotation=45)
    plt.tight_layout()

# Plot feature importance for a few selected carparks in subplots
selected_carparks_to_plot = list(selected_carparks_set)[:num_carparks_to_plot]
fig, axes = plt.subplots(num_subplot_rows, num_subplot_cols, figsize=(15, 5 * num_subplot_rows))
axes = axes.flatten()

# Define a list of base colors for the subplots
base_colors = plt.cm.tab10(np.linspace(0, 1, num_carparks_to_plot))

for ax, carpark_num, base_color in zip(axes, selected_carparks_to_plot, base_colors):
    model, feature_columns, feature_importance = carpark_models[carpark_num]
    plot_feature_importance(carpark_num, feature_importance, feature_columns, ax, base_color)

# Hide any unused subplots
for ax in axes[len(selected_carparks_to_plot):]:
    ax.set_visible(False)

plt.show()
\`\`\`


    
![png](https://github.com/CheahHaoYi/CheahHaoYi.github.io/blob/main/src/lib/data/md_project/Carpark_Availability_Prediction_files/Carpark_Availability_Prediction_64_0.png?raw=true) 


Here, we plot the feature importance of all the carpark summed together to find out the top predicting factors for carpark availability.


\`\`\`python
import numpy as np

import matplotlib.pyplot as plt

# Initialize a dictionary to store the accumulated feature importances
accumulated_importances = {feature: 0 for feature in feature_columns}

# Iterate through each carpark model and accumulate the feature importances
for carpark_num, (model, feature_columns, feature_importance) in carpark_models.items():
    for feature, importance in zip(feature_columns, feature_importance):
        accumulated_importances[feature] += importance

# Normalize the accumulated feature importances
total_importance = sum(accumulated_importances.values())
normalized_importances = {feature: importance / total_importance for feature, importance in accumulated_importances.items()}

# Sort the features by importance
sorted_features = sorted(normalized_importances.items(), key=lambda x: x[1], reverse=True)
features, importances = zip(*sorted_features)

# Plot the overall feature importance with gradient color
plt.figure(figsize=(12, 10))
colors = plt.cm.Blues(np.linspace(1, 0.3, len(features)))  # Create a gradient color map with reversed order
plt.barh(features, importances, color=colors)
plt.xlabel('Normalized Feature Importance')
plt.ylabel('Feature')
plt.title('Overall Feature Importance')
plt.grid(axis='x')

# Adjust y-axis labels to space them out
plt.yticks(ticks=np.arange(len(features)), labels=features, va='center', ha='right', rotation=0, fontsize=10)
plt.gca().invert_yaxis()
plt.show()
\`\`\`


    
![png](https://github.com/CheahHaoYi/CheahHaoYi.github.io/blob/main/src/lib/data/md_project/Carpark_Availability_Prediction_files/Carpark_Availability_Prediction_66_0.png?raw=true)  


## Time Series Model

Another possible exploration is time series model; however, due to time constraints, we did not have time to implement it.

ARIMA (AutoRegressive Integrated Moving Average):
- What it is: ARIMA is a statistical time series model used for forecasting. It captures the temporal dependencies in the data and makes forecasts based on past observations.
- How it works:
  - Autoregression (AR): Uses the relationship between an observation and a specified number of lagged observations (previous time points).
  - Integration (I): Differencing the data to make it stationary, removing trends or seasonality.
  - Moving Average (MA): Models the relationship between an observation and a residual error from a moving average model applied to lagged observations.
- Advantages:
  - Simplicity: ARIMA is easy to understand and implement.
  - Good for linear trends: It works well for data with linear trends and seasonality, where past values provide strong signals for future values.

LSTM (Long Short-Term Memory):
- What it is: LSTM is a type of recurrent neural network (RNN) designed to learn from sequential data, capturing long-term dependencies. It’s particularly useful when there are complex patterns over time that are not easily captured by simpler models like ARIMA.
- How it works:
  - LSTM uses a network of memory cells to store information over long periods, learning from both short-term and long-term dependencies. This makes it suitable for datasets with long-range dependencies (e.g., how occupancy changes over days, months, or even seasons).
  - Gating mechanisms: LSTMs have gates (input, output, and forget gates) that control the flow of information, allowing them to remember or forget certain aspects of the data.
- Advantages:
  - Captures non-linear relationships: LSTM can model complex, non-linear patterns that simpler models (like ARIMA) may miss.
  - Handles long sequences: LSTM is effective in learning from long time series data, making it ideal for predicting car park occupancy over time.

Use in Car Park Occupancy:
- Goal: To predict future car park occupancy over time, taking into account past occupancy patterns, weather conditions, and seasonal effects.
- How it helps: Both ARIMA and LSTM can be used to forecast future occupancy based on historical data, helping to predict when car parks will be full or empty.
  - ARIMA: Can be used if the data shows a clear linear trend over time (e.g., car park occupancy tends to increase at certain times of the day or year).
  - LSTM: If occupancy data has complex, long-term dependencies (e.g., seasonal fluctuations or effects from weather), LSTM could provide more accurate predictions


\`\`\`python
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

# TODO: implement a time series model
def train_model(carpark_name, df, model=RandomForestRegressor(n_estimators=100, random_state=42)):
    """
    Train a model for predicting carpark availability.

    Parameters:
    carpark_name (str): The name of the carpark.
    df (pd.DataFrame): The dataframe containing the carpark data.

    Returns:
    model (RandomForestRegressor): The trained Random Forest Regressor model.
    mse (float): The mean squared error of the model on the test set.
    """
    # Prepare the data
    X = df[['total_lots', 'timestamp']].copy()
    X['timestamp'] = pd.to_datetime(X['timestamp']).astype(int) / 10**9  # Convert timestamp to seconds
    y = df['occupancy_rate']
    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    # Train the model
    model.fit(X_train, y_train)
    # Evaluate the model
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)

    return model, mse

# Example usage
# carpark_name = 'Y3M'
# df = carpark_data_dict[carpark_name]
# model, mse = train_model(carpark_name, df)
# print(f"Mean Squared Error for {carpark_name}: {mse}")

\`\`\`

    Mean Squared Error for Y3M: 0.0002287977649698835



\`\`\`python
# Dictionary to store the trained models for each carpark

carpark_models_dict = {}
error_training_list = []
for cp, df in carpark_data_dict.items():
    model, mse = train_model(cp, df)
    carpark_models_dict[cp] = model
    error_training_list.append(f"{cp}:{mse:.4e}")

for i in range(0, len(error_training_list), 10):
    print(*error_training_list[i:i+10], sep='\\t',end='\\n')
\`\`\`

    TM20:3.9902e-04	SK25:9.9840e-31	SE35:6.9012e-04	CVBK:2.0199e-04	BBM8:2.1870e-04	U4:3.8830e-04	U33:3.2300e-04	AR1M:3.2222e-04	PL32:2.8630e-04	AM18:2.8986e-04
    BJ13:3.7903e-04	B60:2.8612e-04	TM27:1.2043e-04	S116:3.3866e-04	HG2:3.1193e-04	MM2:3.7418e-05	J6:3.6787e-04	H6:2.8274e-04	CK14:4.0878e-04	U17:3.7853e-04
    Y3M:2.2880e-04	CK33:2.5064e-04	T13:2.7057e-04	W40:2.3446e-04	BE9:2.8621e-04	HG32:2.8605e-04	HG4:2.0793e-04	W5M:2.2525e-04	BJ72:3.6792e-04	SK78:4.6350e-04
    T45:2.4191e-04	AM81:1.9163e-04	PR13:2.5177e-04	W14:3.6840e-04	T4:2.6038e-04	PL29:2.8532e-04	BTM2:8.2626e-30	T47A:3.8210e-04	T26:1.8488e-04	SK72:4.1261e-04
    HE17:2.4324e-04	J74:3.8208e-04	U55:6.1645e-04	U24:4.5115e-04	SI10:2.7239e-04	BE6:4.2788e-04	U45:4.1989e-04	AM16:2.1712e-04	HG70:1.9819e-04	Y78M:2.8869e-04


### Time series model

Here, we create a model to predict availability using time of the day (and/or weather of the day) and hyperparameter tuning


\`\`\`python
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

def train_timestamp_model(carpark_name, df, model=RandomForestRegressor(n_estimators=100, random_state=42)):
    """
    Train a model for predicting carpark availability using timestamp and hour.

    Parameters:
    carpark_name (str): The name of the carpark.
    df (pd.DataFrame): The dataframe containing the carpark data.

    Returns:
    model (RandomForestRegressor): The trained Random Forest Regressor model.
    mse (float): The mean squared error of the model on the test set.
    """
    # Prepare the data
    X = df[['timestamp']].copy()
    X['timestamp'] = pd.to_datetime(X['timestamp']).astype(int) / 10**9  # Convert timestamp to seconds
    X['hour'] = pd.to_datetime(X['timestamp']).dt.hour  # Convert timestamp to hour

    y = df['occupancy_rate']
    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    # Train the model
    model.fit(X_train, y_train)
    # Evaluate the model
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)

    return model, mse

# Example usage
# carpark_name = 'Y3M'
# df = carpark_data_dict[carpark_name]
# model, mse = train_timestamp_model(carpark_name, df)
# print(f"Mean Squared Error for {carpark_name}: {mse}")
\`\`\`


\`\`\`python
# Dictionary to store the trained timestamp models for each carpark

timeseries_carpark_models_dict = {}
timeseries_error_training_list  = []
for cp, df in training_carpark_data_dict.items():
    model, mse = train_timestamp_model(cp, df)
    timeseries_carpark_models_dict[cp] = model
    timeseries_error_training_list.append(f"{cp}:{mse:.4e}")

for i in range(0, len(timeseries_error_training_list), 10):
    print(*timeseries_error_training_list[i:i+10], sep='\\t',end='\\n')
\`\`\`

    T75:2.3324e-04	A73:2.2701e-04	J68M:2.1923e-04	SE35:5.1186e-04	T4:1.9031e-04	BR11:2.2318e-04	Y34A:2.6057e-04	B60:3.3886e-04	SK71:2.8653e-04	J6:4.4285e-04
    CC11:1.9182e-04	TM23:1.6373e-04	U55:4.5807e-04	PR13:3.4317e-04	HG32:2.0072e-04	W4M:1.4861e-04	Y13:3.1108e-04	T48:2.4081e-04	U33:2.1773e-04	J74:3.7098e-04
    W579:9.2917e-05	PL37:3.5424e-04	Y35:2.9153e-04	BBM2:1.6907e-04	SI8:2.9258e-02	BJ72:2.4172e-04	Y27:3.0631e-04	TB1:9.1293e-05	KTM3:1.6000e-04	AM46:1.9547e-04
    CK33:1.9842e-04	Y12:1.3047e-04	B67:1.6446e-04	Y31:1.6500e-04	T24:3.4921e-04	HG76:1.7550e-04	U9:3.9767e-04	CK38:2.6640e-04	U24:3.5157e-04	HG2:2.5677e-04
    T49:3.0570e-04	Y49M:1.5678e-04	BTM2:5.5784e-04	SE51:1.7649e-04	BJ18:4.2940e-04	BJ34:3.7108e-04	HG70:2.7064e-04	UA3:3.4944e-04	T80:1.8801e-04	AM19:1.5565e-04
    JRM:2.3936e-04	K2:3.6524e-03	HG3D:2.8956e-04	T51:3.8942e-04	AM22:2.1955e-04	J60M:3.4664e-04	SIM4:1.1788e-04	SI12:2.2723e-04	AR1M:3.0737e-04	CC4:1.9199e-04
    SK25:4.1340e-05	Y26:2.1317e-04	PM46:3.7592e-04	J50:2.0701e-04	U18:3.4471e-04	PL50:3.8221e-04	BBM8:2.1931e-04	U51:1.0716e-04	U38:7.9167e-04	T47A:3.2778e-04
    U29:2.2294e-04	HG54:3.5572e-04	HG69:1.5971e-04	PL30:1.8609e-04	CVBK:3.0078e-04	BA2:2.4361e-04	PL35:2.8126e-04	AH1:2.3090e-04	T37:9.6755e-05	U15:2.2266e-04
    CK44:2.4181e-04	MM2:2.7074e-05	AM80:2.0860e-04	TP53:2.6191e-04	HG4:2.2840e-04	SK77:4.0460e-04	P4:1.6605e-04	S116:2.2230e-04	PM10:3.7361e-04	MP1M:1.5337e-04
    BJ42:1.6866e-04	SE38:1.6380e-04	B52:2.1922e-04	Y73M:9.0455e-05	HG98:4.3420e-04


Hyerparameter Tuning


\`\`\`python
from sklearn.model_selection import GridSearchCV
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.svm import SVR

# TODO: Define the data X and y
X = None
y = None

# Define the parameter grids
param_grid_lr = {'fit_intercept': [True, False], 'copy_X': [True, False], 'n_jobs': [None, 1, 2], 'positive': [True, False]}
param_grid_dt = {'max_depth': [3, 5, 7, 9], 'min_samples_split': [3, 5, 7, 9]}
param_grid_svr = {'C': [0.1, 1, 10, 100], 'gamma': [0.01, 0.1, 1], 'epsilon': [0.1, 0.01, 0.001, 0.0001]}

# Create the models
model_lr = LinearRegression()
model_dt = DecisionTreeRegressor()
model_svr = SVR()

# Perform GridSearchCV for each model
grid_search_lr = GridSearchCV(model_lr, param_grid_lr, cv=5, scoring='neg_mean_squared_error')
grid_search_dt = GridSearchCV(model_dt, param_grid_dt, cv=5, scoring='neg_mean_squared_error')
grid_search_svr = GridSearchCV(model_svr, param_grid_svr, cv=5, scoring='neg_mean_squared_error')

# Fit the models
grid_search_lr.fit(X, y)
grid_search_dt.fit(X, y)
grid_search_svr.fit(X, y)

# Print the best parameters and training MSE
print("Best parameters for Linear Regression: " + str(grid_search_lr.best_params_))
print("MSE: " + str(-grid_search_lr.best_score_) + "\\n")

print("Best parameters for Decision Tree Regression: " + str(grid_search_dt.best_params_))
print("MSE: " + str(-grid_search_dt.best_score_) + "\\n")

print("Best parameters for Support Vector Regression: " + str(grid_search_svr.best_params_))
print("MSE: " + str(-grid_search_svr.best_score_) + "\\n")

\`\`\`

Create a function to get the user input.


\`\`\`python
import datetime

def get_user_input():
  """
  Prompts the user to input a date, time (hour), and postal code of a location.
  Returns the inputs as a dictionary.
  """
  while True:
    try:
      # Prompt for date input
      date_input = input("Enter the date (YYYY-MM-DD): ")
      date = datetime.datetime.strptime(date_input, "%Y-%m-%d").date()
      break
    except ValueError:
      print("Invalid date format. Please enter the date in YYYY-MM-DD format.")

  while True:
    try:
      # Prompt for time (hour) input
      time_input = input("Enter the time (hour) in 24-hour format (HH): ")
      hour = int(time_input)
      if 0 <= hour <= 23:
        break
      else:
        raise ValueError
    except ValueError:
      print("Invalid time format. Please enter the hour as a number between 0 and 23.")

  # Prompt for postal code input
  postal_code = input("Enter the postal code of the location: ").strip()

  user_data = {
      "date": str(date),
      "hour": hour,
      "postal_code": postal_code
  }

  return user_data

# Example usage
# user_input = get_user_input()
# print("User Input:", user_input)

\`\`\`

    Enter the date (YYYY-MM-DD): 2024-11-14
    Enter the time (hour) in 24-hour format (HH): 09
    Enter the postal code of the location: 603287
    User Input: {'date': '2024-11-14', 'hour': 9, 'postal_code': '603287'}



\`\`\`python
def parse_user_input(user_input):
  """
  Preprocess the user input to create a dataframe for model prediction.

  Parameters:
  user_input (dict): The user input containing 'date', 'hour', and 'postal_code'.

  Returns:
  pd.DataFrame: A dataframe ready for prediction with the timeseries ML model.
  """
  prediction_time = datetime.datetime.strptime(user_input['date'], '%Y-%m-%d') + datetime.timedelta(hours=user_input['hour'])

  prediction_input = pd.DataFrame({
      'timestamp': [prediction_time],
      'hour': [user_input['hour']],
  })

  # Convert timestamp to seconds
  prediction_input['timestamp'] = pd.to_datetime(prediction_input['timestamp']).astype(int) / 10**9

  return prediction_input

# Example usage
prediction_input = parse_user_input(user_input)
print(prediction_input)
\`\`\`

          timestamp  hour
    0  1.731575e+09     9



\`\`\`python
# Dictionary to store the prediction results for each carpark

timeseries_prediction_results = {}
for cp, model in timeseries_carpark_models_dict.items():
  res = model.predict(prediction_input)
  timeseries_prediction_results[f'{cp}'] = res[0]

for cp, occ in timeseries_prediction_results.items():
  print(cp, ": ", "%.3f" % occ)
\`\`\`

    TM20 :  0.412
    SK25 :  0.412
    SE35 :  0.412
    CVBK :  0.412
    BBM8 :  0.412
    U4 :  0.412
    U33 :  0.412
    AR1M :  0.412
    PL32 :  0.412
    AM18 :  0.412
    BJ13 :  0.412
    B60 :  0.412
    TM27 :  0.412
    S116 :  0.412
    HG2 :  0.412
    MM2 :  0.412
    J6 :  0.412
    H6 :  0.412
    CK14 :  0.412
    U17 :  0.412
    Y3M :  0.412
    CK33 :  0.412
    T13 :  0.412
    W40 :  0.412
    BE9 :  0.412
    HG32 :  0.412
    HG4 :  0.412
    W5M :  0.412
    BJ72 :  0.412
    SK78 :  0.412
    T45 :  0.412
    AM81 :  0.412
    PR13 :  0.412
    W14 :  0.412
    T4 :  0.412
    PL29 :  0.412
    BTM2 :  0.412
    T47A :  0.412
    T26 :  0.412
    SK72 :  0.412
    HE17 :  0.412
    J74 :  0.412
    U55 :  0.412
    U24 :  0.412
    SI10 :  0.412
    BE6 :  0.412
    U45 :  0.412
    AM16 :  0.412
    HG70 :  0.412
    Y78M :  0.412


### Analysis Insight

Based on the insights derived from the analysis, a practical action would be to develop a **Weather Urban Design Planning Tool** for urban planners.

This tool would utilize historical parking data and weather patterns to identify areas where weather significantly impacts parking availability and accessibility. By integrating predictive analytics, the tool can highlight specific locations requiring infrastructure improvements, such as covered parking facilities to protect vehicles and drivers during heavy rain or high temperatures. Additionally, it could recommend optimizing public transport access and bike-sharing stations in areas prone to parking shortages. Such insights could guide metropolitan investments to prioritize areas with the greatest need and improve overall accessibility. Over time, this tool could help create cities that are better equipped to handle weather-related disruptions, reducing congestion and ensuring more sustainable mobility options for society.

# Conclusion

This project seeks to enhance the parking experience for drivers by developing a machine learning model that predicts real-time carpark availability based on user geolocation and historical data. By integrating the weather data to perform more accurate prediction, we aim to explore the factors affecting the carparks' availability in real life. Furthermore, we try to reduce search times for parking and alleviate urban congestion, by utilizing SVM to predict if a carpark is available. Additionally, our analysis can provdie long-term parking trends, which offers valuable insights for urban planners, contributing to more efficient mobility solutions in cities.

`,r=[{slug:"portfolio-website",color:"#5e95e3",description:"My own portfolio website built with SvelteKit, TypeScript, and Tailwind CSS. Credits to Riadh Adrani for the template, planning to expand on the template",shortDescription:"My own portfolio website built with SvelteKit, TypeScript, and Tailwind CSS.",links:[{to:"https://github.com/CheahHaoYi",label:"My GitHub"},{to:"https://github.com/CheahHaoYi/CheahHaoYi.github.io",label:"Repository"}],logo:t.Svelte,name:"Portfolio Website",period:{from:new Date(2024,12,10)},skills:n("svelte","ts","html","css"),type:"Web Development"},{slug:"riscv-cpu-design",color:"#0047ab",description:"Implementation of a RISC-V processor supporting 32 bit instructions. 			The processor is implemented in Verilog and tested on an FPGA board. 			The processor supports a subset of the RISC-V ISA and is capable of running simple programs. 			The source code cannot be released publicly due to academic integrity reasons.",shortDescription:"Implementation of a RISC-V processor supporting 32 bit instructions.",links:[{to:"https://github.com/NUS-CG3207/labs",label:"Skeleton Code"}],logo:t.RISCV,name:"RISC-V CPU Design",period:{from:new Date(2024,8,1),to:new Date(2024,11,30)},skills:n("verilog","python"),type:"CPU Architecture"},{slug:"portfolio-style-analysis",color:"#a16125",description:e,shortDescription:"Implementation of Sharpe Returns Based Style Analysis in Python using Data from Yahoo Finance",links:[{to:"https://cheahhaoyi.github.io/projects/Portfolio%20Style%20Analysis",label:"Portfolio Website"}],logo:t.Python,name:"Portfolio Style Analysis",period:{from:new Date(2024,8,1),to:new Date(2024,11,30)},skills:n("matplotlib","python","numpy"),type:"Finance"},{slug:"carpark-available-prediction",color:"#c26ad4",description:a,shortDescription:"Prediction of Carpark Availability in Singapore using Machine Learning techniques",links:[{to:"https://cheahhaoyi.github.io/projects/carpark-available-prediction",label:"Portfolio Website"}],logo:t.Python,name:"Singapore Carpark Availability Prediction",period:{from:new Date(2024,8,1),to:new Date(2024,11,30)},skills:n("matplotlib","python","numpy","pandas","sklearn"),type:"Data Science"},{slug:"yamom",color:"#b8161e",description:"Yet Another Module Organiser / Manager offers the latest cutting edge features for NUS students favouring efficiency and productivity. 			Schedule your timetable without your fingers leaving your keyboard.",shortDescription:"CLI for managing modules in NUS",links:[{to:"https://github.com/AY2223S1-CS2113-F11-3/tp",label:"Github Repo"},{to:"https://ay2223s1-cs2113-f11-3.github.io/tp/DeveloperGuide.html",label:"Developer Guide"},{to:"https://ay2223s1-cs2113-f11-3.github.io/tp/UserGuide.html",label:"User Guide"}],logo:t.Java,name:"Yet Another Module Organiser / Manager",period:{from:new Date(2022,8,1),to:new Date(2022,11,30)},skills:n("java"),type:"Software Development"}],d="Projects",s={title:d,items:r};export{s as P};
