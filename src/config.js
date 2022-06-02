global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';
global.EMAIL_TMPL = 'Olá, <strong>{0}</strong>, seja bem vindo à Node Store!';

module.exports = {
    connectionString: 'mongodb+srv://admin:admin@cluster0.iqsce.mongodb.net/?retryWrites=true&w=majority',
    sendgridKey: 'SUA CHAVE', /// feito pra mandar emails para o usuário via SendGrid.com
    containerConnectionString: 'DefaultEndpointsProtocol=https;AccountName=nodestoretest;AccountKey=tyaGmCoZMUu/jRxeWY5vh0w8ErQoGOy98OwnjgyPezjSHGyiCDGF+4C/OgJWCYP1GMKpbKleoQhH+AStafkeqA==;EndpointSuffix=core.windows.net'
}