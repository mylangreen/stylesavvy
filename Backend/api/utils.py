import requests
from requests.auth import HTTPBasicAuth
from django.conf import settings

def get_mpesa_access_token(consumer_key,consumer_secret):
    url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    response = requests.get(url,auth=HTTPBasicAuth(consumer_key,consumer_secret))
    return response.json().get('access_token')

def Lipa_na_mpesa(phone_number, amount, account_reference, transaction_desc):
    access_token = get_mpesa_access_token(settings.CONSUMER_KEY, settings.CONSUMER_SECRET)
    api_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    payload = {
        'BusinessShortCode': settings.MPESA_SHORTCODE,
        'Password': settings.MPESA_PASSWORD,  # This is a base64 encoded string
        'Timestamp': settings.MPESA_TIMESTAMP,  # This is a string in 'yyyyMMddHHmmss' format
        'TransactionType': 'CustomerPayBillOnline',
        'Amount': amount,
        'PartyA': phone_number,
        'PartyB': settings.MPESA_SHORTCODE,
        'PhoneNumber': phone_number,
        'CallBackURL': settings.MPESA_CALLBACK_URL,
        'AccountReference': account_reference,
        'TransactionDesc': transaction_desc
    }
    response = requests.post(api_url, json=payload, headers=headers)
    return response.json()