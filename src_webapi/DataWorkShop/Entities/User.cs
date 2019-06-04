namespace DataWorkShop.Entities
{
    using DataWorkShop.Entities.Structures;
    using EEFApps.ApiInstructions.BaseEntities.Entities;
    using System.ComponentModel.DataAnnotations;

    public class User: BaseEntity<string>
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public byte[] PasswordHash { get; set; }

        [Required]
        public byte[] PasswordSalt { get; set; }

        [Required]
        public UserStatusType Status { get; set; }
    }
}
