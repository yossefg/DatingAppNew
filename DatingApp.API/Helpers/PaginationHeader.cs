namespace DatingApp.API.Helpers
{
    public class PaginationHeader
    {
        public int CurrentPage {get;set;}
        public int ItemsPerPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public PaginationHeader(int currentpage,int itemsperPage, int totalPages,int totalItems)
        {
            this.CurrentPage = currentpage;
            this.ItemsPerPage = itemsperPage;
            this.TotalItems = totalItems;
            this.TotalPages  =totalPages;
        }
    }
}