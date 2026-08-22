# Portfolio Style Analysis

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


```python
!pip install yfinance
import yfinance as yf

from datetime import date
from IPython.display import display, HTML

import pandas as pd
from scipy.optimize import minimize
import matplotlib.pyplot as plt
import matplotlib.ticker as mtick
import seaborn as sns
```

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
    [2K     [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m948.2/948.2 kB[0m [31m17.5 MB/s[0m eta [36m0:00:00[0m
    [?25h  Installing build dependencies ... [?25ldone
    [?25h  Getting requirements to build wheel ... [?25ldone
    [?25h  Preparing metadata (pyproject.toml) ... [?25ldone
    [?25hRequirement already satisfied: beautifulsoup4>=4.11.1 in /home/haoyi/.local/lib/python3.12/site-packages (from yfinance) (4.12.3)
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
    [2K   [90m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m [32m4.9/4.9 MB[0m [31m39.7 MB/s[0m eta [36m0:00:00[0m
    [?25hDownloading multitasking-0.0.11-py3-none-any.whl (8.5 kB)
    Building wheels for collected packages: peewee
      Building wheel for peewee (pyproject.toml) ... [?25ldone
    [?25h  Created wheel for peewee: filename=peewee-3.17.8-cp312-cp312-linux_x86_64.whl size=300347 sha256=4a71e46c4daac19bf938cc990378a2034eba36ca7916dffdf4fda20585c30302
      Stored in directory: /home/haoyi/.cache/pip/wheels/8f/65/34/456800445efeafb05164fe95285c70e81ba1d96bae30f43917
    Successfully built peewee
    Installing collected packages: peewee, multitasking, lxml, html5lib, yfinance
    Successfully installed html5lib-1.1 lxml-5.3.0 multitasking-0.0.11 peewee-3.17.8 yfinance-0.2.51


### Project Parameters

The parameters of the style analysis are defined as shown:
- `start_date` : Starting period of the style anlaysis
- `end_date` : Ending period of the style analysis
- `date_interval` : Interval between data points
- `fund_tick` : Ticker of the fund to perform return-based style analysis on
- `reference_funds` : Tickers of the [stock market indices](https://finance.yahoo.com/markets/world-indices/) to measure the fund's implicit style allocation
- `style_analysis_start_date`: Starting period of the style analysis
- `window_size` : Size of the rolling window period (in months)



```python
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
```

### Risk Free Return

The market risk free rate is an important variable when doing any financial analysis.

We will be retrieving the monthly risk free rate from the [Fama-French Model Data library](https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/data_library.html) by the Tuck School of Business, Dartmouth College.

We will be extracting the Risk-Free Rate From the *Fama/French 5 Factor (2 x 3)* CSV File


```python
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

print(*starting_indices_len.items(), sep="\n")
```

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


```python
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
```


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




```python
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
```

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


```python
monthly_excess_return_table = monthly_return_table.copy()
monthly_excess_return_table = monthly_excess_return_table.apply(lambda x: x - fama_french['RF'].values, axis=0)
monthly_excess_return_table.columns = [col + '_excess_return' for col in monthly_excess_return_table.columns]
display(monthly_excess_return_table.head(), monthly_excess_return_table.tail())
```


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


```python
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
    # print('\t\t', accum_sum_residuals_square)
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
print("Optimized parameters:\talpha", *[f"{r:<5}" for r in reference_funds], sep='\t')
print("Optimized weights:", *[f"{r:.4f}" for r in result.x], sep='\t')
print("Final value of objective function: ", result.fun) # sum of residual squared
```

    Optimized parameters:	alpha	^RUT 	^DJI 	^GSPC	^IXIC	^FTSE
    Optimized weights:	0.0034	0.0373	0.3840	0.2952	0.0000	0.2835
    Final value of objective function:  0.00876929724426853



```python
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
```


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


```python
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
```


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



```python
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
```


    
![Style Analysis Graph](https://github.com/CheahHaoYi/CheahHaoYi.github.io/blob/main/src/lib/data/md_project/Portfolio_Style_Analysis_files/Portfolio_Style_Analysis_19_0.png?raw=true)    

