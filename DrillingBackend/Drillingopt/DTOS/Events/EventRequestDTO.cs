namespace Drillingopt.DTOS.Events
{
    public class EventRequestDTO
    {
        public long ID { get; set; }
        public string? EventTitle { get; set; }
        public long Start { get; set; }
        public long End { get; set; }
    }
}
