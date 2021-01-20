using FlightBooking.API.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FlightBooking.Api.Models
{
    public class Booking
    {
        [Required]
        public int id { get; set; }

        public User user { get; set; }
        public Table table { get; set; }
        [Required]
        public int userId { get; set; }
        [Required]
        public int tableId { get; set; }
        [Required]
        public int TableNumber { get; set; }
        [Required]
        public string RestaurantName { get; set; }
        [Required]
        public int Seats { get; set; }
        [Required]
        public string From { get; set; }
        [Required]
        public string To { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]


        public string Mobile { get; set; }
    }
}
