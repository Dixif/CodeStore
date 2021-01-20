using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlightBooking.API.Data;
using FlightBooking.Api.Models;

namespace FlightBooking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TablesController : ControllerBase
    {
        private readonly DataContext _context;

        public TablesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("gettables")]
        public async Task<ActionResult<IEnumerable<Table>>> GetTable()
        {
            return await _context.Table.ToListAsync();
        }
        [HttpGet("getbooked/{id}")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBooked(int id)
        {

            var flight = await _context.Booking.Where(x => x.userId == id).ToListAsync();

            if (flight == null)
            {
                return NotFound();
            }

            return flight;

        }


        [HttpGet("getBookedtables")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookedflight()
        {
            return await _context.Booking.ToListAsync();
        }

        [HttpGet("gettable/{id}")]
        public async Task<ActionResult<Table>> GetTable(int id)
        {
            var table = await _context.Table.FindAsync(id);

            if (table == null)
            {
                return NotFound();
            }

            return table;
        }
        [HttpPost("BookFlight")]
        public async Task<ActionResult<Table>> PostBook(Booking book)
        {
            _context.Booking.Add(book);
            var val = await _context.SaveChangesAsync();
            if (val != 0)
            {
                var flight = await _context.Table.FindAsync(book.tableId);
                if (flight.Seats < book.Seats)
                {
                    return BadRequest("Only " + flight.Seats + " Seats available");
                }
                else
                {
                    flight.Seats = flight.Seats - book.Seats;
                    _context.Table.Update(flight);
                    await _context.SaveChangesAsync();

                }

            }
            return NoContent();
        }

        [HttpPut("Updatetable/{id}")]
        public async Task<IActionResult> PutTable(int id, Table table)
        {
            if (id != table.Id)
            {
                return BadRequest();
            }

            _context.Entry(table).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TableExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost("Addtable")]
        public async Task<ActionResult<Table>> PostTable(Table table)
        {
            _context.Table.Add(table);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTable", new { id = table.Id }, table);
        }

        [HttpDelete("Deletetable/{id}")]
        public async Task<ActionResult<Table>> DeleteTable(int id)
        {
            var table = await _context.Table.FindAsync(id);
            if (table == null)
            {
                return NotFound();
            }

            _context.Table.Remove(table);
            await _context.SaveChangesAsync();

            return table;
        }

        private bool TableExists(int id)
        {
            return _context.Table.Any(e => e.Id == id);
        }
    }
}
