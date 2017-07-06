using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Sammary.Controllers
{
    public class ReviewsController : Controller
    {
        // GET: Reviews
        public ActionResult Index()
        {
            return View();
        }

        static List<Reviews> data = new List<Reviews>
        {
            new Reviews { Id = Guid.NewGuid().ToString(), Name="Вадим", Review="Это текст отзыва", Date = "7/5/2017 3:57:01" },
            new Reviews { Id = Guid.NewGuid().ToString(), Name="Амаяк", Review="Это текст отзыва", Date = "7/5/2017 3:57:01" },
        };

        public ActionResult GetReviews()
        {
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult AddPhone(Reviews phone)
        {
            phone.Id = Guid.NewGuid().ToString();
            data.Add(phone);
            return Json(phone);
        }

        [HttpDelete]
        public ActionResult DeletePhone(string id)
        {
            Reviews phone = data.FirstOrDefault(x => x.Id == id);
            if (phone != null)
            {
                data.Remove(phone);
                return Json(phone);
            }
            return HttpNotFound();
        }
    }
}