namespace DataWorkShop.Entities
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using EEFApps.ApiInstructions.BaseEntities.Entities;

    public class Calculation: BaseEntityWithUserContext<string, string>
    {
        [Required]
        public string Title { get; set; } 

        [ForeignKey("UserId")]
        public User User { get; set; }

        public ICollection<CalculationItem> Items { get; set; } = new List<CalculationItem>();
    }
}
