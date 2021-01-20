using FlightBooking.API.Models;
using FlightBooking.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FlightBooking.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext>  options) : base (options) {}

        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Table> Table { get; set; }
        public DbSet<Booking> Booking { get; set; }
    }
}