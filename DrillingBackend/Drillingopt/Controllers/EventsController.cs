using Drillingopt.DTOS.Events;
using Drillingopt.Persistence.Context;
using Drillingopt.Persistence.Modles;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Drillingopt.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventsController : ControllerBase
    {

        private readonly DrillingDBContext _context;

        public EventsController(DrillingDBContext context)
        {
            _context = context;
        }

        // GET:  
        [HttpGet("All")]
        public async Task<ActionResult<IEnumerable<EventRequestDTO>>> GetItems()
        {
            return await _context.Events.Select(x => new EventRequestDTO
            {
                ID = x.ID,
                End = x.End,
                Start = x.Start,
                EventTitle = x.EventTitle,


            }).ToListAsync();
        }

        // GET:  
        [HttpGet("Chart")]
        public async Task<ActionResult<IEnumerable<BarchartDataDTO>>> GetChart()
        {

            var response = await
                _context.Events.Select(e => new BarchartDataDTO
                {
                    Label = e.EventTitle,
                    Stack = "a",
                    Data = new List<long>() { e.End - e.Start },
                    BackgroundColor = new List<string>() { e.BackgroundColor == null ? "" : e.BackgroundColor }

                }).ToListAsync();

            return response;

        }



        // GET:  
        [HttpGet("Event/{id}")]
        public async Task<ActionResult<EventRequestDTO>> GetItem(int id)
        {
            var item = _context.Events.Where(x => x.ID == id).
                Select(x => new EventRequestDTO
                {
                    ID = x.ID,
                    End = x.End,
                    Start = x.Start,
                    EventTitle = x.EventTitle,


                }).FirstOrDefault();
            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        // POST:  
        [HttpPost("Post")]
        public async Task<bool> PostItem(EventRequestDTO request)
        {
            var entity = new Events
            {
                ID = request.ID,
                EventTitle = request.EventTitle,
                End = request.End,
                Start = request.Start,
            };
            _context.Events.Add(entity);
            try
            {
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }



        // PUT:  
        [HttpPost("Update")]
        public async Task<bool> PutItem(EventRequestDTO request)
        {
            var entity = _context.Events.FirstOrDefault(x => x.ID == request.ID);

            if (entity != null)
            {
                entity.EventTitle = request.EventTitle;
                entity.End = request.End;
                entity.Start = request.Start;

                _context.Events.Update(entity);
                try
                {
                    await _context.SaveChangesAsync();

                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }

            else
            {
                return false;
            }
        }

    }

}

