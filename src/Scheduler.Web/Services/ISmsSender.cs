using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Scheduler.Web.Services
{
    public class TwilioSmsCredentials
    {
        public string AccountSid { get; set; } = string.Empty;
        public string AuthToken { get; set; } = string.Empty;
        public string FromNumber { get; set; }
    }

    public interface ISmsSender
    {
        Task SendSmsAsync(string number, string message);
    }

    public class SmsSender : ISmsSender
    {
        private const string TwilioSmsEndpointFormat
            = "https://api.twilio.com/2010-04-01/Accounts/{0}/Messages.json";
        private ILogger _log;
        private IConfigurationRoot _config;

        public SmsSender(ILoggerFactory loggerFactory, IConfigurationRoot config)
        {
            _log = loggerFactory.CreateLogger<SmsSender>();
            _config = config;
        }

        public Task SendSmsAsync(string number, string message)
        {
            TwilioSmsCredentials creds = new TwilioSmsCredentials();

            creds.AccountSid = _config["TwilioAccountSid"]; ;
            creds.AuthToken = _config["TwilioToken"];
            creds.FromNumber = _config["TwilioPhone"];

            return SendMessage(creds, number, message);
        }

        private async Task<bool> SendMessage(
            TwilioSmsCredentials credentials,
            string toPhoneNumber,
            string message)
        {
            if (string.IsNullOrWhiteSpace(toPhoneNumber))
            {
                throw new ArgumentException("toPhoneNumber was not provided");
            }

            if (string.IsNullOrWhiteSpace(message))
            {
                throw new ArgumentException("message was not provided");
            }

            var client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = CreateBasicAuthenticationHeader(
                credentials.AccountSid,
                credentials.AuthToken);

            var keyValues = new List<KeyValuePair<string, string>>();
            keyValues.Add(new KeyValuePair<string, string>("To", toPhoneNumber));
            keyValues.Add(new KeyValuePair<string, string>("From", credentials.FromNumber));
            keyValues.Add(new KeyValuePair<string, string>("Body", message));

            var content = new FormUrlEncodedContent(keyValues);

            var postUrl = string.Format(
                    CultureInfo.InvariantCulture,
                    TwilioSmsEndpointFormat,
                    credentials.AccountSid);

            var response = await client.PostAsync(
                postUrl,
                content).ConfigureAwait(false);

            if (response.IsSuccessStatusCode)
            {
                if (_log != null)
                {
                    _log.LogDebug("success sending sms message to " + toPhoneNumber);
                }

                return true;
            }
            else
            {
                if (_log != null)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    var logmessage = $"failed to send sms message to {toPhoneNumber} from {credentials.FromNumber} { response.ReasonPhrase } { responseBody }";
                    _log.LogWarning(logmessage);
                }

                return false;
            }

        }

        private AuthenticationHeaderValue CreateBasicAuthenticationHeader(string username, string password)
        {
            return new AuthenticationHeaderValue(
                "Basic",
                Convert.ToBase64String(Encoding.UTF8.GetBytes(
                     string.Format("{0}:{1}", username, password)
                     )
                 )
            );
        }
    }

}