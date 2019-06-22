namespace BudgetCalculationAPI.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoMapper;
    using BudgetCalculationAPI.Models;
    using DataInstructions.Instructions.UserContextedInstructions;
    using DataWorkShop;
    using DataWorkShop.Entities;
    using EEFApps.ApiInstructions.DataInstructions.Exceptions;
    using EEFApps.ApiInstructions.DataInstructions.Instructions;
    using EEFApps.ApiInstructions.DataInstructions.Instructions.Structures;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;

    [Authorize]
    [ApiController]
    [Produces("application/json")]
    [Route("api/calculations")]
    public class CalculationsController : Controller
    {
        private TailoredDbContext context;
        private IMapper mapper;

        public CalculationsController(TailoredDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        // GET api/calculations
        [HttpGet]
        public async Task<IActionResult> GetCalculations(string orderByField = null, bool isDescending = false, int? pageSize = null, int? pageAt = null)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var calculations = (await new ReceivingUserContextedListInstruction<Calculation, string>(this.context,
                new ListInstructionParams<Calculation>
                {
                    OrderByField = orderByField,
                    IsDescending = isDescending,
                    PageAt = pageAt,
                    PageSize = pageSize
                },
                this.User.Identity.Name
            ).Execute());

            var sanitizedCalculation = this.mapper.Map<IEnumerable<Calculation>, IEnumerable<CalculationViewModel>>(calculations);

            return Ok(sanitizedCalculation);
        }


        // GET api/calculations/5
        [HttpGet("{calculationId}")]
        public async Task<IActionResult> GetCalculation([FromRoute]string calculationId)
        {
            try
            {
                var calculation = await new ReceivingUserContextedInstruction<Calculation, string, string>(
                    this.context,
                    new ReceivingInstructionParams<Calculation, string>
                    {
                        Id = calculationId
                    },
                    this.User.Identity.Name
                ).Execute();

                var sanitizedCalculation = this.mapper.Map<Calculation, CalculationViewModel>(calculation);

                return Ok(sanitizedCalculation);
            }
            catch (InstructionException ex)
            {
                return StatusCode((int)(ex.httpStatusCode), ex.Message);
            }

        }

        // POST: api/calculations
        [HttpPost]
        public async Task<IActionResult> CreateCalculation([FromBody]NewCalculationViewModel newCalculation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var calculationEntity = this.mapper.Map<Calculation>(newCalculation);
                calculationEntity.UserId = this.User.Identity.Name;

                var createdCalculation = await new CreationInstruction<Calculation>(
                    this.context,
                    calculationEntity).Execute();

                return CreatedAtAction("GetCalculation", new { Id = createdCalculation.Id }, this.mapper.Map<Calculation, CalculationViewModel>(createdCalculation));
            }
            catch (InstructionException ex)
            {
                return StatusCode((int)(ex.httpStatusCode), ex.Message);
            }
        }


        // PUT api/calculations/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/calculations/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
