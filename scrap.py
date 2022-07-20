from time import sleep
from selenium import webdriver
#import org.openqa.selenium.Keys
from selenium.webdriver.common.keys import Keys
import time
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
import re
import pandas as pd
from collections import Counter

path = 'C:/Users/Talha/Desktop/Selenium/chromedriver.exe'
driver=webdriver.Chrome(path)
driver.get("https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin")
driver.maximize_window()
username = driver.find_element(By.ID,'username')
username.send_keys('talha.zafar.j@gmail.com')
#driver.minimize_window()


file = open("Skill.txt")
word = file.read()
w = word.split(" ")
if len(w)>=2:
    Skill = '_'.join(w) +'_people'
else:
    Skill = word+'_people'



# locate password form by_class_name
password = driver.find_element(By.ID,'password')

# send_keys() to simulate key strokes
password.send_keys('1am@Campus')

log_in_button = driver.find_element(By.XPATH,'//*[@id="organic-div"]/form/div[3]/button')

# .click() to mimic button click
log_in_button.click()

driver.implicitly_wait(40)
search_key=driver.find_element(by=By.XPATH,value='//*[@id="global-nav-typeahead"]/input')
search_key.send_keys(Skill)
search_key.send_keys(Keys.ENTER)

driver.implicitly_wait(20)
ppl_button=driver.find_element(by=By.XPATH,value='//*[@id="search-reusables__filters-bar"]/ul/li[1]/button')
ppl_button.click()
#people=driver.find_element(by=By.XPATH,value='//*[@id="search-reusables__filters-bar"]/ul/li[2]/button')
#people.click()
d_name=[]
exp=[]
pro_url=[]




d_name=[]
exp=[]
pro_url=[]
edu=[]
m=1
c=1
experience=''
education=''
while (c<=11 and m<=1):
    sleep(1)
    pro=driver.find_element(By.XPATH,'//*[@id="main"]/div/div/div[1]/ul/li['+str(c)+']/div/div/div[2]/div[1]/div[1]/div/span[1]/span/a/span/span[1]')
    pro.click()
    c=c+1
    sleep(1)
    
    page_source = BeautifulSoup(driver.page_source, "html.parser")

    name = page_source.find('h1',{'class':'text-heading-xlarge inline t-24 v-align-middle break-words'})
    name=name.get_text().strip()
    d_name.append(name)
    for i in page_source.findAll('div',{'class':'display-flex flex-column full-width'}):
        i=i.get_text().strip()
        #print('value of i is =>',i)
        i=re.sub("\s\s+", " ", str(i))
        experience=experience+' '+i+' '
    experience=re.sub(r"(\w)([A-Z])", r"\1 \2", experience)
    experience=experience.split()
    uniqx=Counter(experience)
    experience=" ".join(sorted(set(experience), key=experience.index))
    #word_tokenize(experience)
    #print('experience=>',experience)

    for j in page_source.findAll('span',{'class':'mr1 hoverable-link-text t-bold'}):
        j=j.get_text().strip()
        i=re.sub("\s\s+", " ", str(j))
        i=' '+i+' '
        education=education+' '+i+' '
    education=re.sub(r"(\w)([A-Z])", r"\1 \2", education)
    education=education.split()
    uniqx=Counter(education)
    education=" ".join(sorted(set(education), key=education.index))
    #print('education=>',education)
    #print('Name',name)
    exp.append(experience)
    edu.append(education)
    experience=''
    education=''
    profile_url=driver.current_url
    pro_url.append(profile_url)
    #print('url=>',profile_url)
    sleep(1)
    driver.back()
    sleep(1)
    if c==10 and m<=1:
        #print('condition become true')
        sleep(1)
        next_page='https://www.linkedin.com/search/results/all/?keywords=nodejs_people&origin=GLOBAL_SEARCH_HEADER&page='+str(m)+'&sid=d%40D'
        driver.get(next_page)
        c=1
        m=m+1
    

scraped_data=pd.DataFrame(list(zip(d_name,exp,edu,pro_url)),columns=['Name','experience','education','Profile_Link'],dtype=str)
scraped_data.to_csv('Cscraped_data.csv')
print('csv created', flush=True)
driver.close()