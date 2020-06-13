import boto3
import json
from boto3.dynamodb.conditions import Key, Attr

# Get the service resource.
dynamodb = boto3.resource('dynamodb')

table = dynamodb.Table('tag-store-db')

def lambda_handler(event, context):
    #initializing the tags
    tag1=''
    tag2=''
    tag3=''
    tag4=''
    tag5=''
    
    print(event['queryStringParameters'])
    if 'queryStringParameters' in event and 'tag1' in event['queryStringParameters']:
        print('TAG1 Exists')
        tag1 = event['queryStringParameters']['tag1']
    
    if 'queryStringParameters' in event and 'tag2' in event['queryStringParameters']:
        print('TAG2 Exists')
        tag2 = event['queryStringParameters']['tag2']
        
    if 'queryStringParameters' in event and 'tag3' in event['queryStringParameters']:
        print('TAG3 Exists')
        tag3 = event['queryStringParameters']['tag3']
        
    if 'queryStringParameters' in event and 'tag4' in event['queryStringParameters']:
        print('TAG4 Exists')
        tag4 = event['queryStringParameters']['tag4']
        
    if 'queryStringParameters' in event and 'tag5' in event['queryStringParameters']:
        print('TAG5 Exists')
        tag5 = event['queryStringParameters']['tag5']
        
    response = table.scan(
        #FilterExpression = Attr('data').contains('fork') & Attr('data').contains('test')
        FilterExpression = Attr('data').contains(tag1) & Attr('data').contains(tag2) & Attr('data').contains(tag3) & Attr('data').contains(tag4) & Attr('data').contains(tag5)
    )
    
    objects = response['Items']
    # To store all the urls
    urls = []
    
    for item in objects:
        urls.append(item.get('url'))    
    
    #print(response['Items'])
    return {
        'statusCode': 200,
        #'body': json.dumps(objects)
        'body': json.dumps(urls),
        "headers": {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        }
    }
