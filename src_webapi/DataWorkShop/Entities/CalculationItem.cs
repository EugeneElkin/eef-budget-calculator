namespace DataWorkShop.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using EEFApps.ApiInstructions.BaseEntities.Entities;

    public class CalculationItem: BaseEntityWithUserContext<string, string>
    {
        [Required]
        public double Sum { get; set; }

        [Required]
        public string Aim { get; set; }

        [Required]
        public bool IsPaid { get; set; }

        public string CalculationId { get; set; }
        [ForeignKey("CategoryId")]
        public Calculation Calculation { get; set; }
    }
}
