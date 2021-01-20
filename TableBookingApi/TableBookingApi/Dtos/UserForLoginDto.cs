namespace FlightBooking.API.Dtos
{
    public class UserForLoginDto
    {
        public string Username { get; set; }
        public string IsAdmin { get; set; }
        public string Password { get; set; }
    }
}