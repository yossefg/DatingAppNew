using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Helpers
{
    public class PagedList<T> : List<T>
    {
        public PagedList(int currentPage, int totalPages, int pageSize, int totalCount) 
        {
            this.CurrentPage = currentPage;
                this.TotalPages = totalPages;
                this.PageSize = pageSize;
                this.TotalCount = totalCount;
               
        }
            public int CurrentPage { get; set; }

    public int TotalPages { get; set; }

    public int PageSize { get; set; }

    public int TotalCount { get; set; }

    public PagedList(List<T> items,int count,int pagenumber,int _pagesize){
        TotalCount = count;
        PageSize= _pagesize;
        CurrentPage = pagenumber;
        TotalPages = (int)System.Math.Ceiling(count/(double)PageSize);
        this.AddRange(items);
    }
    public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source,int pagenumber , int pagesize){
        var count = await source.CountAsync();
        var item = await source.Skip((pagenumber-1) * pagesize).Take(pagesize).ToListAsync();
        return new PagedList<T>(item,count,pagenumber,pagesize);
    }

    }
}