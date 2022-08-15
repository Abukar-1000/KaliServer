from syslog import LOG_LOCAL0
import threading as t
from time import sleep
import asyncio
import socket
import urllib3 as ul
import json
import os

"""
This is a small addition to the changes that I made to check how git works
this is a small nueance for my first commit 
"""
# async def grabData():
#     http = ul.PoolManager()
#     url = "http://localhost:3000/query"
#     response = http.request("GET",url)
#     jsonResponse = json.loads(response.data.decode('utf-8'))
#     for content in jsonResponse["allUsers"]:
#         print(f" {content['name']} | {content['mac']}")


# async def main():
#     task = asyncio.create_task(grabData())
#     await task

# asyncio.run(main())

# file = open("output.txt","w+")

def to1000():
    for x in range(100):
        print("echo in to1000")

def sayHi(phrase):
    for x in range(100):
        print(f"echo in {phrase}")

firstThread = t.Thread(target=to1000)
secondThread = t.Thread(target=sayHi,args=["hi There"])

firstThread.start()
secondThread.start()
# file.close()

