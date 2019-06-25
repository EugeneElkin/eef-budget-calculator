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
    using Microsoft.AspNetCore.JsonPatch;

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
            try
            {
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
            catch (InstructionException ex)
            {
                return StatusCode((int)(ex.httpStatusCode), ex.Message);
            }
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

        // PATCH api/calculations/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchCalcualtion([FromRoute] string id, [FromBody] JsonPatchDocument<Calculation> patchingCalculation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await new PatchUserContextedInstruction<Calculation, string, string>(
                    this.context,
                    new PatchInstructionParams<Calculation, string>
                    {
                        Id = id,
                        DeltaEntity = patchingCalculation
                    },
                    this.User.Identity.Name)
                    .Execute();

                return NoContent();
            }
            catch (InstructionException ex)
            {
                return StatusCode((int)(ex.httpStatusCode), ex.Message);
            }
        }

        // DELETE api/calculations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] string id, string rowVersion)
        {
            try
            {
                await new RemovalOptimizedUserContextedInstruction<Calculation, string, string>(
                    this.context,
                    new RemovalInstructionParams<string>()
                    {
                        Id = id,
                        Base64RowVersion = rowVersion
                    },
                    this.User.Identity.Name)
                    .Execute();

                return Ok();
            }
            catch (InstructionException ex)
            {
                return StatusCode((int)(ex.httpStatusCode), ex.Message);
            }
        }
    }
}
